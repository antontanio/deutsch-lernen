// DeutschLern — Progress Module
// Spaced repetition (SM-2 simplified), daily plan, XP, checklist state

window.PROGRESS = (() => {

  const LEVELS = ['A1','A2','B1','B2','C1'];
  const XP_VALUES = {
    vocabCorrect: 5,
    vocabWrong: 1,
    exerciseCorrect: 10,
    exerciseWrong: 2,
    writingSubmit: 20,
    speakingSubmit: 20,
    topicMastered: 50,
    levelUnlocked: 100,
    streakBonus: 10
  };

  // ─── Spaced Repetition (SM-2 simplified) ─────
  // Each vocab card: { id, interval, easeFactor, dueDate, repetitions }

  const SRS_KEY = 'dl_vocab_srs';

  function getSRSData() {
    return STORAGE._load(SRS_KEY, {});
  }

  function saveSRSData(data) {
    STORAGE._save(SRS_KEY, data);
  }

  function getCardData(vocabId) {
    const srs = getSRSData();
    return srs[vocabId] || {
      id: vocabId,
      interval: 1,        // days until next review
      easeFactor: 2.5,    // multiplier
      repetitions: 0,     // consecutive correct answers
      dueDate: 0,         // timestamp when due
      totalReviews: 0,
      correctReviews: 0
    };
  }

  function updateCard(vocabId, quality) {
    // quality: 0-5 (0-2 = fail, 3-5 = pass, 5 = perfect)
    const card = getCardData(vocabId);
    const srs = getSRSData();

    card.totalReviews++;

    if (quality >= 3) {
      // Correct
      card.correctReviews++;
      if (card.repetitions === 0) card.interval = 1;
      else if (card.repetitions === 1) card.interval = 3;
      else card.interval = Math.round(card.interval * card.easeFactor);
      card.repetitions++;
    } else {
      // Incorrect — reset
      card.repetitions = 0;
      card.interval = 1;
    }

    // Update ease factor
    card.easeFactor = Math.max(1.3,
      card.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
    );

    card.dueDate = Date.now() + card.interval * 86400000;
    srs[vocabId] = card;
    saveSRSData(srs);

    // Award XP
    const xp = quality >= 3 ? XP_VALUES.vocabCorrect : XP_VALUES.vocabWrong;
    STORAGE.addXP(xp);

    return card;
  }

  function getDueCards(level, maxCount = 20) {
    const srs = getSRSData();
    const now = Date.now();
    const levelVocab = window.DB_VOCAB.filter(v => v.level === level);

    // Cards due for review
    const due = levelVocab.filter(v => {
      const card = srs[v.id];
      return !card || card.dueDate <= now;
    });

    // Prioritise: never seen first, then oldest due
    due.sort((a, b) => {
      const ca = srs[a.id];
      const cb = srs[b.id];
      if (!ca) return -1;
      if (!cb) return 1;
      return ca.dueDate - cb.dueDate;
    });

    return due.slice(0, maxCount);
  }

  function getCardStats(level) {
    const srs = getSRSData();
    const levelVocab = window.DB_VOCAB.filter(v => v.level === level);
    const now = Date.now();
    let unseen = 0, due = 0, learning = 0, mastered = 0;
    levelVocab.forEach(v => {
      const card = srs[v.id];
      if (!card) { unseen++; return; }
      if (card.dueDate <= now) { due++; return; }
      if (card.interval >= 14) mastered++;
      else learning++;
    });
    return { total: levelVocab.length, unseen, due, learning, mastered };
  }

  // ─── Grammar topic progress ───────────────────

  function getGrammarTopics(level) {
    const rules = window.DB_GRAMMAR.filter(g => g.level === level);
    const topics = {};
    rules.forEach(r => {
      if (!topics[r.topic]) topics[r.topic] = { rules: [], state: 'not-started' };
      topics[r.topic].rules.push(r.id);
      const saved = STORAGE.getTopicState(level, 'grammar_' + r.topic);
      topics[r.topic].state = saved;
    });
    return topics;
  }

  function recordGrammarAttempt(level, topic, score) {
    const result = STORAGE.updateTopicScore(level, 'grammar_' + topic, score);
    const xp = score >= 80 ? XP_VALUES.exerciseCorrect : XP_VALUES.exerciseWrong;
    STORAGE.addXP(xp);
    if (result.state === 'mastered') {
      STORAGE.addXP(XP_VALUES.topicMastered);
    }
    return result;
  }

  // ─── Writing & Speaking progress ─────────────

  function recordWritingAttempt(level, promptId, score) {
    STORAGE.updateTopicScore(level, 'writing_' + promptId, score);
    STORAGE.addXP(XP_VALUES.writingSubmit);
    STORAGE.markCompleted('writing', promptId);
    STORAGE.logSession({ type: 'writing', level, promptId, score, date: new Date().toISOString() });
  }

  function recordSpeakingAttempt(level, promptId, score) {
    STORAGE.updateTopicScore(level, 'speaking_' + promptId, score);
    STORAGE.addXP(XP_VALUES.speakingSubmit);
    STORAGE.logSession({ type: 'speaking', level, promptId, score, date: new Date().toISOString() });
  }

  // ─── Level unlock logic ───────────────────────

  function isLevelUnlocked(level) {
    if (level === 'A1') return true;
    const idx = LEVELS.indexOf(level);
    if (idx <= 0) return true;
    const prev = LEVELS[idx - 1];
    return getLevelProgress(prev) >= 60; // 60% of prev level to unlock next
  }

  function getLevelProgress(level) {
    const progress = STORAGE.getProgress();
    if (!progress[level]) return 0;
    const topics = Object.values(progress[level]);
    if (topics.length === 0) return 0;
    const mastered = topics.filter(t => t.state === 'mastered').length;
    const learning = topics.filter(t => t.state === 'learning').length;
    return Math.round((mastered * 100 + learning * 40) / Math.max(1, topics.length));
  }

  // ─── Daily Plan Generator ─────────────────────
  // Max ~20 minutes. Returns a mix of vocab SRS, grammar, writing/speaking.

  function generateDailyPlan(level, sessionMaxMins = 20) {
    const plan = [];
    const completedToday = _getCompletedToday();
    let estimatedMins = 0;

    // 1. SRS vocab due (highest priority, ~5 mins worth)
    const dueVocab = getDueCards(level, 20);
    if (dueVocab.length > 0 && estimatedMins < sessionMaxMins * 0.4) {
      const vocabBatch = dueVocab.slice(0, Math.min(10, dueVocab.length));
      plan.push({
        type: 'vocab-review',
        title: `Vocabulary Review (${vocabBatch.length} cards)`,
        items: vocabBatch,
        estimatedMins: Math.ceil(vocabBatch.length * 0.5),
        priority: 1
      });
      estimatedMins += Math.ceil(vocabBatch.length * 0.5);
    }

    // 2. Grammar exercises (~5–8 mins)
    if (estimatedMins < sessionMaxMins * 0.7) {
      const grammarRules = window.DB_GRAMMAR.filter(g => g.level === level);
      const unmastered = grammarRules.filter(g => {
        const state = STORAGE.getTopicState(level, 'grammar_' + g.topic);
        return state !== 'mastered';
      });
      if (unmastered.length > 0) {
        const rule = unmastered[Math.floor(Math.random() * unmastered.length)];
        plan.push({
          type: 'grammar',
          title: rule.title,
          rule: rule,
          estimatedMins: 5,
          priority: 2
        });
        estimatedMins += 5;
      }
    }

    // 3. Speaking or Writing prompt (~7–10 mins)
    if (estimatedMins < sessionMaxMins) {
      const remaining = sessionMaxMins - estimatedMins;
      if (remaining >= 5) {
        // Alternate between speaking and writing
        const sessions = STORAGE.getSessions();
        const lastType = sessions.length > 0 ? sessions[sessions.length - 1].type : 'writing';
        const nextType = lastType === 'writing' ? 'speaking' : 'writing';

        if (nextType === 'speaking') {
          const prompts = window.DB_PROMPTS.speaking.filter(p => p.level === level);
          const unused = prompts.filter(p => !STORAGE.isCompleted('speaking_today', p.id));
          if (unused.length > 0) {
            const prompt = unused[Math.floor(Math.random() * unused.length)];
            plan.push({
              type: 'speaking',
              title: prompt.title,
              prompt: prompt,
              estimatedMins: prompt.timeMinutes,
              priority: 3
            });
          }
        } else {
          const prompts = window.DB_PROMPTS.writing.filter(p => p.level === level);
          const unused = prompts.filter(p => !STORAGE.isCompleted('writing_today', p.id));
          if (unused.length > 0) {
            const prompt = unused[Math.floor(Math.random() * unused.length)];
            plan.push({
              type: 'writing',
              title: prompt.title,
              prompt: prompt,
              estimatedMins: prompt.timeMinutes,
              priority: 3
            });
          }
        }
      }
    }

    const totalMins = plan.reduce((sum, item) => sum + (item.estimatedMins || 0), 0);
    return { plan, totalMins, level };
  }

  function _getCompletedToday() {
    const today = new Date().toDateString();
    const sessions = STORAGE.getSessions();
    return sessions.filter(s => new Date(s.date).toDateString() === today);
  }

  // ─── Level overview stats ─────────────────────

  function getLevelStats(level) {
    const vocab = getCardStats(level);
    const grammar = window.DB_GRAMMAR.filter(g => g.level === level);
    const grammarMastered = grammar.filter(g => STORAGE.getTopicState(level, 'grammar_' + g.topic) === 'mastered').length;
    const writing = window.DB_PROMPTS.writing.filter(p => p.level === level);
    const speaking = window.DB_PROMPTS.speaking.filter(p => p.level === level);
    const writingDone = writing.filter(p => STORAGE.isCompleted('writing', p.id)).length;
    const speakingDone = speaking.filter(p => STORAGE.isCompleted('speaking', p.id)).length;

    return {
      vocab: { ...vocab, percentage: Math.round((vocab.mastered / Math.max(1, vocab.total)) * 100) },
      grammar: { total: grammar.length, mastered: grammarMastered, percentage: Math.round((grammarMastered / Math.max(1, grammar.length)) * 100) },
      writing: { total: writing.length, done: writingDone, percentage: Math.round((writingDone / Math.max(1, writing.length)) * 100) },
      speaking: { total: speaking.length, done: speakingDone, percentage: Math.round((speakingDone / Math.max(1, speaking.length)) * 100) },
      overallProgress: getLevelProgress(level),
      unlocked: isLevelUnlocked(level)
    };
  }

  // ─── Milestone checker ────────────────────────

  function checkMilestones() {
    const xp = STORAGE.getXP();
    const streak = STORAGE.getStreak();
    const milestones = [];

    const xpMilestones = [100, 500, 1000, 5000];
    xpMilestones.forEach(m => {
      if (xp.total >= m && xp.total - (xp.today || 0) < m) {
        milestones.push({ type: 'xp', value: m, message: `🎉 ${m} XP reached!` });
      }
    });

    const streakMilestones = [3, 7, 14, 30];
    streakMilestones.forEach(m => {
      if (streak.count === m) {
        milestones.push({ type: 'streak', value: m, message: `🔥 ${m} day streak!` });
      }
    });

    LEVELS.forEach(level => {
      if (getLevelProgress(level) >= 100) {
        milestones.push({ type: 'level', value: level, message: `🏆 ${level} complete!` });
      }
    });

    return milestones;
  }

  // ─── Checklist management ─────────────────────

  function getChecklist(level) {
    const grammar = window.DB_GRAMMAR.filter(g => g.level === level);
    const vocab = window.DB_VOCAB.filter(v => v.level === level);
    const vocabTopics = [...new Set(vocab.map(v => v.topic))];

    const items = [
      ...grammar.map(g => ({
        id: `grammar_${g.id}`,
        label: g.title,
        type: 'grammar',
        state: STORAGE.getTopicState(level, 'grammar_' + g.topic)
      })),
      ...vocabTopics.map(t => {
        const stats = getCardStats(level);
        return {
          id: `vocab_${t}`,
          label: `Vocabulary: ${t}`,
          type: 'vocab',
          state: STORAGE.getTopicState(level, 'vocab_' + t)
        };
      })
    ];

    return items;
  }

  function toggleChecklistItem(level, itemId) {
    const current = STORAGE.getTopicState(level, itemId);
    const states = ['not-started', 'learning', 'mastered'];
    const next = states[(states.indexOf(current) + 1) % states.length];
    STORAGE.setTopicState(level, itemId, next);
    return next;
  }

  // Public API
  return {
    // SRS
    getDueCards,
    updateCard,
    getCardStats,
    // Grammar
    getGrammarTopics,
    recordGrammarAttempt,
    // Writing/Speaking
    recordWritingAttempt,
    recordSpeakingAttempt,
    // Level
    isLevelUnlocked,
    getLevelProgress,
    getLevelStats,
    // Plan
    generateDailyPlan,
    // Milestones
    checkMilestones,
    // Checklist
    getChecklist,
    toggleChecklistItem,
    // XP
    XP_VALUES,
    LEVELS
  };

})();

console.log('PROGRESS loaded');
