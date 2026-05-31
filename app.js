// DeutschLern — Main Application
// Screen routing, all UI logic, Web Speech API, animations, AI assist

window.APP = (() => {

  // ═══════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════

  const state = {
    screen: 'dashboard',
    level: 'A1',
    aiAssist: false,
    theme: 'auto',
    // Current activity
    currentVocabCard: null,
    vocabQueue: [],
    vocabIndex: 0,
    currentGrammarRule: null,
    currentExerciseIndex: 0,
    currentWritingPrompt: null,
    currentSpeakingPrompt: null,
    // Recording
    isRecording: false,
    transcript: '',
    recognition: null,
    // Session
    sessionStart: Date.now(),
    sessionXP: 0
  };

  // ═══════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════

  function init() {
    const settings = STORAGE.getSettings();
    state.level = settings.currentLevel || 'A1';
    state.aiAssist = settings.aiAssist || false;
    state.theme = settings.theme || 'auto';

    applyTheme(state.theme);
    renderTopBar();
    renderSideNav();
    setupSpeechRecognition();
    navigate('dashboard');
    setupGlobalEvents();
    checkAndShowMilestones();

    // Keyboard shortcut: Ctrl+/ = toggle AI
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key === '/') toggleAI();
    });
  }

  // ═══════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════

  function navigate(screen, opts = {}) {
    state.screen = screen;
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.screen === screen);
    });
    const main = document.getElementById('main-content');
    if (!main) return;
    main.innerHTML = '';
    main.classList.add('fade-in');
    setTimeout(() => main.classList.remove('fade-in'), 300);

    const renders = {
      dashboard: renderDashboard,
      topics: renderTopics,
      vocab: renderVocab,
      grammar: renderGrammar,
      speaking: renderSpeaking,
      writing: renderWriting,
      progress: renderProgress,
      'exam-guide': renderExamGuide,
      settings: renderSettings,
      howto: renderHowTo
    };
    (renders[screen] || renderDashboard)(opts);
  }

  function setupGlobalEvents() {
    document.addEventListener('click', e => {
      const nav = e.target.closest('[data-screen]');
      if (nav) { e.preventDefault(); navigate(nav.dataset.screen, { level: nav.dataset.level }); }
      const levelDot = e.target.closest('[data-level-select]');
      if (levelDot) { setLevel(levelDot.dataset.levelSelect); }
    });
  }

  // ═══════════════════════════════════════════════
  // TOP BAR
  // ═══════════════════════════════════════════════

  function renderTopBar() {
    const bar = document.getElementById('top-bar');
    if (!bar) return;
    const xp = STORAGE.getXP();
    const streak = STORAGE.getStreak();
    bar.innerHTML = `
      <div class="top-bar-logo" data-screen="dashboard" style="cursor:pointer">
        <span class="logo-icon">🇩🇪</span>
        <span class="logo-text">DeutschLern</span>
      </div>
      <div class="level-dots">
        ${['A1','A2','B1','B2','C1'].map(l => `
          <button class="level-dot ${l === state.level ? 'active' : ''} ${PROGRESS.isLevelUnlocked(l) ? '' : 'locked'}"
            data-level-select="${l}" title="${l}${PROGRESS.isLevelUnlocked(l) ? '' : ' 🔒'}">
            ${l}${PROGRESS.isLevelUnlocked(l) ? '' : ' 🔒'}
          </button>
        `).join('')}
      </div>
      <div class="top-bar-right">
        <button class="ai-toggle ${state.aiAssist ? 'on' : 'off'}" id="ai-toggle-btn" onclick="APP.toggleAI()" title="Toggle AI Assist">
          <span class="ai-icon">✨</span>
          AI ${state.aiAssist ? 'ON' : 'OFF'}
        </button>
        <div class="badge xp-badge" title="Total XP">⚡ ${xp.total}</div>
        <div class="badge streak-badge ${streak.count > 0 ? 'active' : ''}" title="${streak.count} day streak">
          🔥 ${streak.count}
        </div>
        <button class="theme-toggle" onclick="APP.cycleTheme()" title="Toggle theme">
          ${state.theme === 'dark' ? '☀️' : state.theme === 'light' ? '🌙' : '🖥️'}
        </button>
      </div>`;
  }

  function renderSideNav() {
    const nav = document.getElementById('side-nav');
    if (!nav) return;
    const items = [
      { id:'dashboard', icon:'🏠', label:'Dashboard' },
      { id:'topics', icon:'📚', label:'Topics' },
      { id:'vocab', icon:'🃏', label:'Vocabulary' },
      { id:'grammar', icon:'📐', label:'Grammar' },
      { id:'speaking', icon:'🎤', label:'Speaking' },
      { id:'writing', icon:'✏️', label:'Writing' },
      { id:'progress', icon:'📊', label:'Progress' },
      { id:'exam-guide', icon:'📋', label:'Exam Guide' },
      { id:'settings', icon:'⚙️', label:'Settings' },
      { id:'howto', icon:'❓', label:'How to Use' }
    ];
    nav.innerHTML = items.map(item => `
      <button class="nav-item ${state.screen === item.id ? 'active' : ''}" data-screen="${item.id}">
        <span class="nav-icon">${item.icon}</span>
        <span class="nav-label">${item.label}</span>
      </button>`).join('');
  }

  // ═══════════════════════════════════════════════
  // DASHBOARD
  // ═══════════════════════════════════════════════

  function renderDashboard() {
    const main = document.getElementById('main-content');
    const stats = PROGRESS.getLevelStats(state.level);
    const plan = PROGRESS.generateDailyPlan(state.level);
    const xp = STORAGE.getXP();
    const streak = STORAGE.getStreak();
    const settings = STORAGE.getSettings();

    main.innerHTML = `
      <div class="dashboard">
        <div class="dash-header">
          <h1>Welcome back! 👋</h1>
          <p class="dash-subtitle">Working towards ${state.level} — ${settings.currentLevel} level</p>
        </div>

        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-number">${xp.today}</div>
            <div class="stat-label">XP Today</div>
            <div class="stat-bar"><div class="stat-bar-fill" style="width:${Math.min(100,(xp.today/settings.dailyGoalXP)*100)}%"></div></div>
            <div class="stat-hint">Goal: ${settings.dailyGoalXP} XP</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${streak.count}</div>
            <div class="stat-label">Day Streak 🔥</div>
            <div class="stat-hint">${streak.count > 0 ? 'Keep it up!' : 'Start your streak today!'}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.overallProgress}%</div>
            <div class="stat-label">${state.level} Progress</div>
            <div class="stat-bar"><div class="stat-bar-fill" style="width:${stats.overallProgress}%"></div></div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.vocab.due}</div>
            <div class="stat-label">Vocab Due</div>
            <div class="stat-hint">${stats.vocab.mastered} mastered</div>
          </div>
        </div>

        <div class="dash-sections">
          <div class="daily-plan">
            <h2>Today's Plan <span class="plan-time">~${plan.totalMins} min</span></h2>
            ${plan.plan.length === 0 ? '<p class="empty-state">All caught up! 🎉 Come back tomorrow.</p>' :
              plan.plan.map((item, i) => `
                <div class="plan-item" onclick="APP.startPlanItem(${i})">
                  <div class="plan-icon">${item.type === 'vocab-review' ? '🃏' : item.type === 'grammar' ? '📐' : item.type === 'speaking' ? '🎤' : '✏️'}</div>
                  <div class="plan-info">
                    <div class="plan-title">${item.title}</div>
                    <div class="plan-meta">${item.estimatedMins} min</div>
                  </div>
                  <div class="plan-chevron">›</div>
                </div>`).join('')
            }
          </div>

          <div class="quick-actions">
            <h2>Quick Practice</h2>
            <button class="action-btn" data-screen="vocab">🃏 Flashcards</button>
            <button class="action-btn" data-screen="grammar">📐 Grammar Drill</button>
            <button class="action-btn" data-screen="speaking">🎤 Speaking</button>
            <button class="action-btn" data-screen="writing">✏️ Writing</button>
          </div>
        </div>

        <div class="level-overview">
          <h2>${state.level} Overview</h2>
          <div class="overview-grid">
            ${_progressBar('Vocabulary', stats.vocab.percentage)}
            ${_progressBar('Grammar', stats.grammar.percentage)}
            ${_progressBar('Writing', stats.writing.percentage)}
            ${_progressBar('Speaking', stats.speaking.percentage)}
          </div>
        </div>

        ${_culturalNote(state.level)}
      </div>`;

    // Store plan for startPlanItem
    window._currentPlan = plan.plan;
    // Typewriter on dashboard greeting
    _typewriter('dash-subtitle', `Working towards ${state.level} — keep going!`);
  }

  function _progressBar(label, pct) {
    return `<div class="overview-item">
      <div class="overview-label">${label} <span class="overview-pct">${pct}%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
    </div>`;
  }

  function _culturalNote(level) {
    if (!window.DB_CULTURAL) return '';
    const note = window.CULTURAL_HELPERS ? window.CULTURAL_HELPERS.random(level) : null;
    if (!note) return '';
    return `<div class="cultural-note">
      <div class="cultural-emoji">${note.emoji}</div>
      <div class="cultural-body">
        <div class="cultural-title">Did you know? — ${note.title}</div>
        <div class="cultural-text">${note.body}</div>
      </div>
      <button class="cultural-skip" onclick="this.closest('.cultural-note').style.display='none'" aria-label="Dismiss">✕</button>
    </div>`;
  }

  function _typewriter(elId, text, speed = 40) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { el.textContent += text[i++]; }
      else clearInterval(interval);
    }, speed);
  }

  function startPlanItem(index) {
    const item = (window._currentPlan || [])[index];
    if (!item) return;
    if (item.type === 'vocab-review') navigate('vocab');
    else if (item.type === 'grammar') navigate('grammar', { ruleId: item.rule.id });
    else if (item.type === 'speaking') navigate('speaking', { promptId: item.prompt.id });
    else if (item.type === 'writing') navigate('writing', { promptId: item.prompt.id });
  }

  // ═══════════════════════════════════════════════
  // VOCABULARY FLASHCARDS
  // ═══════════════════════════════════════════════

  function renderVocab(opts = {}) {
    const main = document.getElementById('main-content');
    const stats = PROGRESS.getCardStats(state.level);
    const due = PROGRESS.getDueCards(state.level, 20);

    if (due.length === 0) {
      main.innerHTML = `<div class="screen-pad">
        <h1>🃏 Vocabulary — ${state.level}</h1>
        <div class="card-done">
          <div class="done-icon">✅</div>
          <h2>All caught up!</h2>
          <p>No vocabulary cards are due right now.</p>
          <p>Next review: check back tomorrow.</p>
          <div class="vocab-stats-row">
            <div class="vs-item"><b>${stats.mastered}</b><br>Mastered</div>
            <div class="vs-item"><b>${stats.learning}</b><br>Learning</div>
            <div class="vs-item"><b>${stats.unseen}</b><br>New</div>
            <div class="vs-item"><b>${stats.total}</b><br>Total</div>
          </div>
          <button class="btn-primary" data-screen="dashboard">Back to Dashboard</button>
        </div>
      </div>`;
      return;
    }

    state.vocabQueue = due;
    state.vocabIndex = 0;
    state.currentVocabCard = due[0];

    main.innerHTML = `<div class="screen-pad">
      <div class="vocab-header">
        <h1>🃏 Vocabulary — ${state.level}</h1>
        <div class="vocab-progress-text">${stats.due} due • ${stats.mastered} mastered</div>
      </div>
      <div class="card-container" id="card-container">
        ${renderFlashcard(state.currentVocabCard)}
      </div>
      <div class="card-nav">
        <button class="btn-danger" id="btn-wrong" onclick="APP.vocabAnswer(1)" style="display:none">✗ Hard</button>
        <button class="btn-warning" id="btn-ok" onclick="APP.vocabAnswer(3)" style="display:none">~ OK</button>
        <button class="btn-success" id="btn-correct" onclick="APP.vocabAnswer(5)" style="display:none">✓ Easy</button>
        <button class="btn-secondary" id="btn-flip" onclick="APP.flipCard()">Tap to reveal →</button>
      </div>
      <div id="vocab-tip" class="tip-card" style="display:none"></div>
    </div>`;
  }

  function renderFlashcard(vocab) {
    return `<div class="flashcard" id="flashcard" onclick="APP.flipCard()">
      <div class="card-front">
        <div class="card-de">${vocab.de}</div>
        ${vocab.gender !== '-' && vocab.gender !== 'pl' ? `<div class="card-gender">${vocab.gender === 'm' ? 'der (m)' : vocab.gender === 'f' ? 'die (f)' : 'das (n)'}</div>` : ''}
        <div class="card-level-tag">${vocab.level} · ${vocab.topic}</div>
        <div class="card-hint">tap to see translation</div>
      </div>
      <div class="card-back" style="display:none">
        <div class="card-en">${vocab.en}</div>
        ${vocab.gender !== '-' ? `<div class="card-gender-back">${vocab.gender === 'm' ? '🔵 der' : vocab.gender === 'f' ? '🔴 die' : vocab.gender === 'n' ? '🟢 das' : '🟡 (plural)'}</div>` : ''}
        <div class="card-example">"${vocab.example}"</div>
        <div class="card-example-en">${vocab.exampleEn}</div>
      </div>
    </div>`;
  }

  function flipCard() {
    const front = document.querySelector('.card-front');
    const back = document.querySelector('.card-back');
    const card = document.getElementById('flashcard');
    if (!front || !back) return;

    card.classList.add('flipping');
    setTimeout(() => {
      front.style.display = 'none';
      back.style.display = 'block';
      card.classList.remove('flipping');
      card.classList.add('flipped');
    }, 150);

    // Show answer buttons
    document.getElementById('btn-flip').style.display = 'none';
    document.getElementById('btn-wrong').style.display = 'inline-block';
    document.getElementById('btn-ok').style.display = 'inline-block';
    document.getElementById('btn-correct').style.display = 'inline-block';
  }

  function vocabAnswer(quality) {
    if (!state.currentVocabCard) return;
    const result = PROGRESS.updateCard(state.currentVocabCard.id, quality);
    state.sessionXP += quality >= 3 ? PROGRESS.XP_VALUES.vocabCorrect : PROGRESS.XP_VALUES.vocabWrong;

    // Animate feedback
    const card = document.getElementById('flashcard');
    if (card) {
      card.classList.add(quality >= 3 ? 'correct-flash' : 'wrong-shake');
      setTimeout(() => card.classList.remove('correct-flash', 'wrong-shake'), 500);
    }

    // Next card
    state.vocabIndex++;
    if (state.vocabIndex >= state.vocabQueue.length) {
      _showVocabComplete();
    } else {
      state.currentVocabCard = state.vocabQueue[state.vocabIndex];
      const container = document.getElementById('card-container');
      if (container) {
        container.innerHTML = renderFlashcard(state.currentVocabCard);
        document.getElementById('btn-flip').style.display = 'inline-block';
        document.getElementById('btn-wrong').style.display = 'none';
        document.getElementById('btn-ok').style.display = 'none';
        document.getElementById('btn-correct').style.display = 'none';
      }
    }
    renderTopBar();
  }

  function _showVocabComplete() {
    const container = document.getElementById('card-container');
    if (container) {
      container.innerHTML = `<div class="session-complete">
        <div class="complete-icon">🎉</div>
        <h2>Session complete!</h2>
        <p>You reviewed ${state.vocabQueue.length} cards</p>
        <p class="xp-earned">+${state.sessionXP} XP earned</p>
        <button class="btn-primary" data-screen="dashboard">Back to Dashboard</button>
      </div>`;
      document.querySelector('.card-nav').style.display = 'none';
    }
    triggerConfetti();
    renderTopBar();
  }

  // ═══════════════════════════════════════════════
  // GRAMMAR
  // ═══════════════════════════════════════════════

  function renderGrammar(opts = {}) {
    const main = document.getElementById('main-content');
    const rules = window.DB_GRAMMAR.filter(g => g.level === state.level);

    if (opts.ruleId) {
      const rule = rules.find(r => r.id === opts.ruleId) || rules[0];
      renderGrammarRule(rule);
      return;
    }

    main.innerHTML = `<div class="screen-pad">
      <h1>📐 Grammar — ${state.level}</h1>
      <div class="grammar-list">
        ${rules.map(rule => {
          const s = STORAGE.getTopicState(state.level, 'grammar_' + rule.topic);
          return `<div class="grammar-card" onclick="APP.openGrammarRule('${rule.id}')">
            <div class="gc-state ${s}">${s === 'mastered' ? '✅' : s === 'learning' ? '📖' : '⭕'}</div>
            <div class="gc-info">
              <div class="gc-title">${rule.title}</div>
              <div class="gc-meta">${rule.topic} · ${rule.exercises.length} exercises</div>
            </div>
            <div class="gc-arrow">›</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  function openGrammarRule(ruleId) {
    const rule = window.DB_GRAMMAR.find(r => r.id === ruleId);
    if (rule) renderGrammarRule(rule);
  }

  function renderGrammarRule(rule) {
    const main = document.getElementById('main-content');
    state.currentGrammarRule = rule;
    state.currentExerciseIndex = 0;

    main.innerHTML = `<div class="screen-pad">
      <button class="back-btn" onclick="APP.navigate('grammar')">← Grammar</button>
      <h1>${rule.title}</h1>
      <div class="level-badge">${rule.level}</div>

      <div class="concept-card">
        <p class="explanation">${rule.explanation}</p>
        <ul class="key-points">
          ${rule.keyPoints.map(k => `<li>${k}</li>`).join('')}
        </ul>
      </div>

      ${rule.conjugation ? `
        <div class="conjugation-table">
          <h3>${rule.conjugation.verb}</h3>
          <table>
            ${rule.conjugation.forms.map(f => `
              <tr><td class="pronoun">${f.pronoun}</td><td class="form">${f.form}</td><td class="english">${f.english}</td></tr>
            `).join('')}
          </table>
        </div>` : ''}

      <div class="examples-section">
        <h3>Examples</h3>
        ${rule.examples.map(ex => `
          <div class="example-row">
            <div class="example-de">${ex.de}</div>
            <div class="example-en">${ex.en}</div>
          </div>`).join('')}
      </div>

      <div class="errors-section">
        <h3>Common Errors</h3>
        ${rule.errors.map(err => `
          <div class="error-row">
            <div class="error-wrong">✗ ${err.wrong}</div>
            <div class="error-right">✓ ${err.right}</div>
            <div class="error-exp">${err.explanation}</div>
          </div>`).join('')}
      </div>

      <div class="exercises-section">
        <h3>Exercises</h3>
        <div id="exercise-area">
          ${renderExercise(rule.exercises[0], 0, rule.exercises.length)}
        </div>
      </div>
    </div>`;
  }

  function renderExercise(exercise, index, total) {
    if (!exercise) return '<p>No exercises available.</p>';
    const typeLabels = {
      fillBlank: 'Fill in the blank',
      wordOrder: 'Word order',
      errorCorrect: 'Correct the error',
      choice: 'Choose the correct answer',
      conjugation: 'Conjugate the verb',
      transform: 'Transform',
      article: 'Choose the article',
      analysis: 'Analysis'
    };
    return `
      <div class="exercise-card" id="exercise-${index}">
        <div class="ex-header">
          <span class="ex-type">${typeLabels[exercise.type] || exercise.type}</span>
          <span class="ex-counter">${index+1}/${total}</span>
        </div>
        <div class="ex-prompt">${exercise.prompt}</div>
        ${exercise.hint ? `<div class="ex-hint">💡 ${exercise.hint}</div>` : ''}
        <div class="ex-input-area">
          ${renderExerciseInput(exercise, index)}
        </div>
        <div class="ex-feedback" id="ex-feedback-${index}" style="display:none"></div>
        <div class="ex-actions">
          <button class="btn-primary" onclick="APP.submitExercise(${index})">Check</button>
          ${index + 1 < total ? `<button class="btn-secondary" id="btn-next-${index}" onclick="APP.nextExercise(${index+1})" style="display:none">Next →</button>` : ''}
        </div>
      </div>`;
  }

  function renderExerciseInput(exercise, index) {
    if (exercise.type === 'choice' || exercise.type === 'article') {
      const options = exercise.options || (exercise.type === 'article' ? ['der','die','das'] : ['Option A','Option B']);
      return options.map(opt => `
        <label class="choice-option">
          <input type="radio" name="ex_${index}" value="${opt}"> ${opt}
        </label>`).join('');
    }
    if (exercise.type === 'conjugation') {
      const pronouns = ['ich','du','er/sie/es','wir','ihr','sie/Sie'];
      return `<div class="conjugation-inputs">
        ${pronouns.map(p => `<div class="conj-row">
          <span class="conj-pronoun">${p}</span>
          <input class="conj-input" type="text" placeholder="..." data-pronoun="${p}">
        </div>`).join('')}
      </div>`;
    }
    return `<input class="text-input" type="text" id="ex-input-${index}" placeholder="Your answer..." onkeydown="if(event.key==='Enter') APP.submitExercise(${index})">`;
  }

  function submitExercise(index) {
    const rule = state.currentGrammarRule;
    if (!rule) return;
    const exercise = rule.exercises[index];
    const feedback = document.getElementById(`ex-feedback-${index}`);
    const nextBtn = document.getElementById(`btn-next-${index}`);

    let userAnswer;
    if (exercise.type === 'choice' || exercise.type === 'article') {
      const selected = document.querySelector(`input[name="ex_${index}"]:checked`);
      userAnswer = selected ? selected.value : '';
    } else if (exercise.type === 'conjugation') {
      const inputs = document.querySelectorAll('.conj-input');
      userAnswer = {};
      inputs.forEach(inp => { userAnswer[inp.dataset.pronoun] = inp.value.trim(); });
    } else {
      userAnswer = (document.getElementById(`ex-input-${index}`) || {}).value || '';
    }

    if (!userAnswer || (typeof userAnswer === 'object' && Object.values(userAnswer).every(v => !v))) {
      feedback.textContent = 'Please enter an answer first.';
      feedback.style.display = 'block';
      return;
    }

    const result = ASSESSMENT.checkExercise(exercise.type, userAnswer, exercise.answer || exercise.correctAnswer || '');
    feedback.style.display = 'block';
    feedback.className = `ex-feedback ${result.correct ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = result.feedback.join('<br>');

    PROGRESS.recordGrammarAttempt(state.level, rule.topic, result.score);
    renderTopBar();

    if (nextBtn) nextBtn.style.display = 'inline-block';
    if (result.correct) {
      feedback.classList.add('pop-in');
    }
  }

  function nextExercise(nextIndex) {
    const rule = state.currentGrammarRule;
    if (!rule) return;
    const area = document.getElementById('exercise-area');
    if (area) {
      area.innerHTML = renderExercise(rule.exercises[nextIndex], nextIndex, rule.exercises.length);
      area.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ═══════════════════════════════════════════════
  // WRITING
  // ═══════════════════════════════════════════════

  function renderWriting(opts = {}) {
    const main = document.getElementById('main-content');
    const prompts = window.DB_PROMPTS.writing.filter(p => p.level === state.level);

    if (opts.promptId || prompts.length === 0) {
      const prompt = prompts.find(p => p.id === opts.promptId) || prompts[0];
      if (prompt) openWritingPrompt(prompt.id);
      return;
    }

    main.innerHTML = `<div class="screen-pad">
      <h1>✏️ Writing — ${state.level}</h1>
      <div class="prompt-list">
        ${prompts.map(p => {
          const done = STORAGE.isCompleted('writing', p.id);
          return `<div class="prompt-card ${done ? 'done' : ''}" onclick="APP.openWritingPrompt('${p.id}')">
            <div class="pc-icon">${done ? '✅' : '📝'}</div>
            <div class="pc-info">
              <div class="pc-title">${p.title}</div>
              <div class="pc-meta">${p.type} · ${p.timeMinutes} min · ${p.wordCount?.min}–${p.wordCount?.max} words</div>
              ${p.aiAssistRecommended ? '<div class="ai-badge">✨ AI recommended</div>' : ''}
            </div>
            <div class="pc-arrow">›</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  function openWritingPrompt(promptId) {
    const prompt = window.DB_PROMPTS.writing.find(p => p.id === promptId);
    if (!prompt) return;
    state.currentWritingPrompt = prompt;
    const main = document.getElementById('main-content');
    const scaffoldLevel = prompt.scaffold?.level || 'none';
    const showScaffold = scaffoldLevel !== 'none';

    main.innerHTML = `<div class="screen-pad writing-screen">
      <button class="back-btn" onclick="APP.navigate('writing')">← Writing</button>
      <h1>${prompt.title}</h1>
      <div class="level-badge">${prompt.level}</div>

      <div class="task-card">
        <div class="task-prompt-de">${prompt.prompt}</div>
        <div class="task-prompt-en">${prompt.promptEn}</div>
        <div class="task-info">
          <span>⏱ ${prompt.timeMinutes} min</span>
          <span>📝 ${prompt.wordCount?.min}–${prompt.wordCount?.max} words</span>
          ${prompt.aiAssistRecommended ? '<span class="ai-note">✨ AI feedback recommended</span>' : ''}
        </div>
      </div>

      <div class="task-detail">
        <strong>Task:</strong> ${prompt.task}
      </div>

      ${showScaffold ? `
        <div class="scaffold-card">
          <div class="scaffold-header">
            📋 Structure guide
            ${scaffoldLevel === 'outline' ? '<span class="scaffold-tag">outline only</span>' : '<span class="scaffold-tag">template</span>'}
          </div>
          ${prompt.scaffold?.template ? `<pre class="scaffold-template">${prompt.scaffold.template}</pre>` : ''}
          ${prompt.scaffold?.hint ? `<div class="scaffold-hint">💡 ${prompt.scaffold.hint}</div>` : ''}
        </div>` : ''}

      ${prompt.phraseBank?.length ? `
        <details class="phrase-bank">
          <summary>💬 Useful phrases (${prompt.phraseBank.length})</summary>
          <div class="phrase-list">
            ${prompt.phraseBank.map(pb => `
              <div class="phrase-row">
                <span class="phrase-text">"${pb.phrase}"</span>
                <span class="phrase-use">${pb.use}</span>
              </div>`).join('')}
          </div>
        </details>` : ''}

      <div class="writing-area">
        <div class="word-counter" id="word-counter">0 / ${prompt.wordCount?.min}–${prompt.wordCount?.max} words</div>
        <textarea id="writing-input" placeholder="Write your answer here in German..."
          oninput="APP.updateWordCount()" rows="12"></textarea>
      </div>

      <div class="writing-actions">
        <button class="btn-primary" onclick="APP.submitWriting()">Submit for Assessment</button>
        ${prompt.aiAssistRecommended || prompt.aiAssistSuggested ? `
          <button class="btn-ai ${state.aiAssist ? '' : 'ai-disabled'}" onclick="APP.submitWritingAI()">
            ✨ Submit with AI Feedback ${state.aiAssist ? '' : '(AI Assist is OFF)'}
          </button>` : ''}
      </div>

      <div id="writing-results" style="display:none"></div>
    </div>`;
  }

  function updateWordCount() {
    const ta = document.getElementById('writing-input');
    const counter = document.getElementById('word-counter');
    if (!ta || !counter) return;
    const wc = ASSESSMENT.countWords(ta.value);
    const prompt = state.currentWritingPrompt;
    const min = prompt?.wordCount?.min || 0;
    const max = prompt?.wordCount?.max || 999;
    counter.textContent = `${wc} / ${min}–${max} words`;
    counter.className = `word-counter ${wc >= min ? 'ok' : wc >= min * 0.8 ? 'close' : 'short'}`;
  }

  function submitWriting() {
    const ta = document.getElementById('writing-input');
    const prompt = state.currentWritingPrompt;
    if (!ta || !prompt) return;
    const text = ta.value.trim();
    if (ASSESSMENT.countWords(text) < 5) {
      showToast('Please write something first!', 'warning');
      return;
    }

    const result = ASSESSMENT.assessWriting(text, prompt);
    PROGRESS.recordWritingAttempt(state.level, prompt.id, result.totalScore);
    renderTopBar();

    const resultsDiv = document.getElementById('writing-results');
    if (resultsDiv) {
      resultsDiv.style.display = 'block';
      resultsDiv.innerHTML = renderAssessmentResults(result, 'writing');
      resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    if (result.totalScore >= 80) triggerConfetti();
  }

  async function submitWritingAI() {
    const settings = STORAGE.getSettings();
    if (!settings.apiKey) {
      showToast('Please add your Anthropic API key in Settings.', 'warning');
      navigate('settings');
      return;
    }
    if (!state.aiAssist) {
      showToast('Enable AI Assist toggle first.', 'warning');
      return;
    }
    const ta = document.getElementById('writing-input');
    const prompt = state.currentWritingPrompt;
    if (!ta || !prompt) return;
    const text = ta.value.trim();
    if (ASSESSMENT.countWords(text) < 5) { showToast('Write something first!', 'warning'); return; }

    const wc = ASSESSMENT.countWords(text);
    const estimatedTokens = Math.round(wc * 2);
    const ok = confirm(`This will use ~${estimatedTokens} tokens from your Anthropic API key.\nContinue?`);
    if (!ok) return;

    const resultsDiv = document.getElementById('writing-results');
    if (resultsDiv) {
      resultsDiv.style.display = 'block';
      resultsDiv.innerHTML = '<div class="loading">✨ Getting AI feedback...</div>';
      resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    const localResult = ASSESSMENT.assessWriting(text, prompt);
    const aiResult = await callAnthropicAPI(settings.apiKey, buildWritingAssessmentPrompt(text, prompt));

    if (resultsDiv) {
      resultsDiv.innerHTML = renderAssessmentResults(localResult, 'writing', aiResult);
    }
    PROGRESS.recordWritingAttempt(state.level, prompt.id, localResult.totalScore);
    renderTopBar();
    if (localResult.totalScore >= 80) triggerConfetti();
  }

  function buildWritingAssessmentPrompt(text, prompt) {
    return `You are a German language examiner assessing a ${prompt.level} level writing task.

Task: ${prompt.prompt}
Student's writing:
---
${text}
---

Rubric: ${JSON.stringify(prompt.rubric)}

Please provide:
1. Overall score (0-100)
2. Specific feedback on argument quality and style (2-3 sentences)
3. Grammar errors found (list up to 3 specific errors with corrections)
4. Vocabulary suggestions (1-2 words/phrases to improve)
5. One thing done particularly well

Keep feedback concise, specific, and encouraging. Respond in English.`;
  }

  // ═══════════════════════════════════════════════
  // SPEAKING
  // ═══════════════════════════════════════════════

  function renderSpeaking(opts = {}) {
    const main = document.getElementById('main-content');
    const prompts = window.DB_PROMPTS.speaking.filter(p => p.level === state.level);

    if (opts.promptId) {
      const prompt = prompts.find(p => p.id === opts.promptId) || prompts[0];
      if (prompt) openSpeakingPrompt(prompt.id);
      return;
    }

    main.innerHTML = `<div class="screen-pad">
      <h1>🎤 Speaking — ${state.level}</h1>
      <div class="speaking-info-card">
        <p>Practice speaking tasks using your microphone. Your speech is transcribed, then assessed for content, vocabulary and grammar. Pronunciation cannot be assessed offline.</p>
        ${!window.SpeechRecognition && !window.webkitSpeechRecognition ? '<p class="warning">⚠️ Your browser may not support speech recognition. Try Chrome.</p>' : ''}
      </div>
      <div class="prompt-list">
        ${prompts.map(p => `
          <div class="prompt-card" onclick="APP.openSpeakingPrompt('${p.id}')">
            <div class="pc-icon">🎤</div>
            <div class="pc-info">
              <div class="pc-title">${p.title}</div>
              <div class="pc-meta">Part ${p.part} · ${p.timeMinutes} min${p.prepSeconds > 0 ? ` · ${p.prepSeconds}s prep` : ''}</div>
              ${p.aiAssistRecommended ? '<div class="ai-badge">✨ AI recommended</div>' : ''}
            </div>
            <div class="pc-arrow">›</div>
          </div>`).join('')}
      </div>
    </div>`;
  }

  function openSpeakingPrompt(promptId) {
    const prompt = window.DB_PROMPTS.speaking.find(p => p.id === promptId);
    if (!prompt) return;
    state.currentSpeakingPrompt = prompt;
    state.transcript = '';
    const main = document.getElementById('main-content');

    main.innerHTML = `<div class="screen-pad speaking-screen">
      <button class="back-btn" onclick="APP.navigate('speaking')">← Speaking</button>
      <h1>${prompt.title}</h1>
      <div class="level-badge">${prompt.level}</div>

      <div class="task-card">
        <div class="task-prompt-de">${prompt.prompt}</div>
        <div class="task-prompt-en">${prompt.promptEn}</div>
        <div class="task-info">
          <span>⏱ ${prompt.timeMinutes} min</span>
          ${prompt.prepSeconds > 0 ? `<span>📋 ${prompt.prepSeconds}s prep</span>` : ''}
        </div>
      </div>

      <div class="task-detail">${prompt.task}</div>

      ${prompt.visualCue ? `<div class="visual-cue">${prompt.visualCue}</div>` : ''}

      ${prompt.phraseBank?.length ? `
        <details class="phrase-bank">
          <summary>💬 Useful phrases</summary>
          <div class="phrase-list">
            ${prompt.phraseBank.map(pb => `
              <div class="phrase-row">
                <span class="phrase-text">"${pb.phrase}"</span>
                <span class="phrase-use">${pb.use}</span>
              </div>`).join('')}
          </div>
        </details>` : ''}

      <div class="recording-section">
        <div class="mic-area">
          <button class="mic-btn" id="mic-btn" onclick="APP.toggleRecording()">
            <span class="mic-icon">🎤</span>
          </button>
          <div class="rec-status" id="rec-status">Tap to start recording</div>
        </div>
        <div class="transcript-box" id="transcript-box">
          <div class="transcript-placeholder">Your speech will appear here...</div>
        </div>
        <div class="rec-actions">
          <button class="btn-secondary" onclick="APP.clearTranscript()">Clear</button>
          <button class="btn-primary" onclick="APP.submitSpeaking()">Submit for Assessment</button>
          ${prompt.aiAssistRecommended ? `
            <button class="btn-ai ${state.aiAssist ? '' : 'ai-disabled'}" onclick="APP.submitSpeakingAI()">
              ✨ AI Feedback
            </button>` : ''}
        </div>
        <div class="transcript-edit-hint">You can also type or edit your answer in the box above</div>
        <textarea id="transcript-edit" style="display:none" rows="6" placeholder="Or type your speaking response here..."></textarea>
        <button class="btn-link" onclick="APP.toggleTranscriptEdit()">Type instead</button>
      </div>

      <div id="speaking-results" style="display:none"></div>
    </div>`;
  }

  function setupSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;
    const rec = new SpeechRec();
    rec.lang = 'de-DE';
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let interim = '';
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript + ' ';
        else interim += e.results[i][0].transcript;
      }
      state.transcript += final;
      updateTranscriptDisplay(state.transcript + interim);
    };
    rec.onerror = (e) => {
      if (e.error === 'no-speech') return;
      showToast('Microphone error: ' + e.error, 'error');
      stopRecording();
    };
    rec.onend = () => { if (state.isRecording) rec.start(); };
    state.recognition = rec;
  }

  function toggleRecording() {
    if (state.isRecording) stopRecording();
    else startRecording();
  }

  function startRecording() {
    if (!state.recognition) {
      showToast('Speech recognition not supported. Try Chrome.', 'warning');
      document.getElementById('transcript-edit').style.display = 'block';
      return;
    }
    state.isRecording = true;
    state.recognition.start();
    const btn = document.getElementById('mic-btn');
    const status = document.getElementById('rec-status');
    if (btn) btn.classList.add('recording');
    if (status) status.textContent = '🔴 Recording... tap to stop';
  }

  function stopRecording() {
    state.isRecording = false;
    if (state.recognition) state.recognition.stop();
    const btn = document.getElementById('mic-btn');
    const status = document.getElementById('rec-status');
    if (btn) btn.classList.remove('recording');
    if (status) status.textContent = 'Recording stopped. Submit or record again.';
  }

  function updateTranscriptDisplay(text) {
    const box = document.getElementById('transcript-box');
    if (box) box.innerHTML = `<p>${text || '<span class="transcript-placeholder">Your speech will appear here...</span>'}</p>`;
  }

  function clearTranscript() {
    state.transcript = '';
    updateTranscriptDisplay('');
  }

  function toggleTranscriptEdit() {
    const ta = document.getElementById('transcript-edit');
    if (ta) ta.style.display = ta.style.display === 'none' ? 'block' : 'none';
  }

  function getTranscriptText() {
    const edit = document.getElementById('transcript-edit');
    if (edit && edit.style.display !== 'none' && edit.value.trim()) return edit.value.trim();
    return state.transcript.trim();
  }

  function submitSpeaking() {
    const text = getTranscriptText();
    const prompt = state.currentSpeakingPrompt;
    if (!text || !prompt) { showToast('No speech or text to assess.', 'warning'); return; }
    if (ASSESSMENT.countWords(text) < 3) { showToast('Please say or type more.', 'warning'); return; }

    const result = ASSESSMENT.assessSpeaking(text, prompt);
    PROGRESS.recordSpeakingAttempt(state.level, prompt.id, result.totalScore);
    renderTopBar();

    const resultsDiv = document.getElementById('speaking-results');
    if (resultsDiv) {
      resultsDiv.style.display = 'block';
      resultsDiv.innerHTML = renderAssessmentResults(result, 'speaking');
      resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
    if (result.totalScore >= 80) triggerConfetti();
  }

  async function submitSpeakingAI() {
    const settings = STORAGE.getSettings();
    if (!settings.apiKey || !state.aiAssist) {
      showToast('Enable AI Assist and add API key in Settings.', 'warning');
      return;
    }
    const text = getTranscriptText();
    const prompt = state.currentSpeakingPrompt;
    if (!text || !prompt) return;
    const wc = ASSESSMENT.countWords(text);
    if (!confirm(`AI feedback: ~${wc * 2} tokens. Continue?`)) return;

    const localResult = ASSESSMENT.assessSpeaking(text, prompt);
    const aiResult = await callAnthropicAPI(settings.apiKey,
      `You are a German language examiner assessing a ${prompt.level} speaking task.
Prompt: ${prompt.prompt}
Transcript: ${text}
Give brief feedback: content coverage, vocabulary quality, grammar, and 1 specific improvement tip. English, 100 words max.`
    );
    const resultsDiv = document.getElementById('speaking-results');
    if (resultsDiv) {
      resultsDiv.style.display = 'block';
      resultsDiv.innerHTML = renderAssessmentResults(localResult, 'speaking', aiResult);
      resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ═══════════════════════════════════════════════
  // ASSESSMENT RESULTS RENDERER
  // ═══════════════════════════════════════════════

  function renderAssessmentResults(result, type, aiText = null) {
    const grade = result.grade;
    const score = result.totalScore;
    const color = score >= 80 ? '#2ecc71' : score >= 60 ? '#f39c12' : '#e74c3c';
    return `<div class="results-panel">
      <div class="results-header">
        <div class="results-score" style="color:${color}">${score}<span class="score-label">/100</span></div>
        <div class="results-grade">${grade}</div>
        <div class="results-enc">${ASSESSMENT.encouragement(score)}</div>
      </div>

      ${result.positiveFeedback?.length ? `
        <div class="feedback-section positive">
          <h4>✅ What you did well</h4>
          <ul>${result.positiveFeedback.map(f => `<li>${f.replace(/^✓\s*/,'')}</li>`).join('')}</ul>
        </div>` : ''}

      ${result.feedback?.length ? `
        <div class="feedback-section improve">
          <h4>📈 To improve</h4>
          <ul>${result.feedback.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>` : ''}

      ${result.breakdown ? `
        <details class="breakdown-details">
          <summary>Score breakdown</summary>
          <div class="breakdown-grid">
            ${Object.entries(result.breakdown).map(([k,v]) => `
              <div class="breakdown-row">
                <span class="breakdown-key">${k}</span>
                <div class="breakdown-bar">
                  <div class="breakdown-fill" style="width:${v.score}%;background:${v.score>=70?'#2ecc71':'#e74c3c'}"></div>
                </div>
                <span class="breakdown-score">${v.score}%</span>
              </div>`).join('')}
          </div>
        </details>` : ''}

      ${aiText ? `
        <div class="ai-feedback-section">
          <h4>✨ AI Feedback</h4>
          <div class="ai-feedback-text">${aiText.replace(/\n/g,'<br>')}</div>
        </div>` : result.readyForAI ? `
        <div class="ai-suggest">
          💡 <strong>AI Assist recommended</strong> for deeper feedback on this ${result.grade >= 'B' ? 'advanced' : ''} level task.
          ${!state.aiAssist ? '<br>Enable the AI toggle in the top bar, then resubmit.' : ''}
        </div>` : ''}

      ${type === 'speaking' && result.limitations ? `
        <div class="limitation-note">${result.limitations[0]}</div>` : ''}

      <div class="results-tip">💡 Tip: ${ASSESSMENT.levelTip(state.level)}</div>
    </div>`;
  }

  // ═══════════════════════════════════════════════
  // PROGRESS SCREEN
  // ═══════════════════════════════════════════════

  function renderProgress() {
    const main = document.getElementById('main-content');
    const xp = STORAGE.getXP();
    const streak = STORAGE.getStreak();

    main.innerHTML = `<div class="screen-pad">
      <h1>📊 Progress</h1>

      <div class="prog-summary">
        <div class="prog-stat">⚡ <b>${xp.total}</b> total XP</div>
        <div class="prog-stat">🔥 <b>${streak.count}</b> day streak</div>
        <div class="prog-stat">⚡ <b>${xp.today}</b> XP today</div>
      </div>

      <div class="level-tabs">
        ${PROGRESS.LEVELS.map(l => `
          <button class="level-tab ${l === state.level ? 'active' : ''}" onclick="APP.setLevel('${l}')">${l}</button>
        `).join('')}
      </div>

      <div id="level-progress-detail">
        ${renderLevelDetail(state.level)}
      </div>

      <div class="progress-actions">
        <button class="btn-secondary" onclick="STORAGE.exportData()">📥 Export Progress</button>
        <button class="btn-secondary" onclick="APP.showImport()">📤 Import Progress</button>
        <button class="btn-secondary" onclick="APP.syncGist()">☁️ Sync to Gist</button>
      </div>
    </div>`;
  }

  function renderLevelDetail(level) {
    const stats = PROGRESS.getLevelStats(level);
    const checklist = PROGRESS.getChecklist(level);
    if (!PROGRESS.isLevelUnlocked(level)) {
      return `<div class="locked-msg">🔒 Complete ${PROGRESS.LEVELS[PROGRESS.LEVELS.indexOf(level)-1]} to unlock ${level}</div>`;
    }
    return `
      <div class="level-detail">
        <h2>${level} Level — ${stats.overallProgress}% complete</h2>
        <div class="level-stats-grid">
          ${[
            ['📚 Vocabulary', stats.vocab.percentage, `${stats.vocab.mastered}/${stats.vocab.total} mastered`],
            ['📐 Grammar', stats.grammar.percentage, `${stats.grammar.mastered}/${stats.grammar.total} topics`],
            ['✏️ Writing', stats.writing.percentage, `${stats.writing.done}/${stats.writing.total} prompts`],
            ['🎤 Speaking', stats.speaking.percentage, `${stats.speaking.done}/${stats.speaking.total} prompts`]
          ].map(([label, pct, sub]) => `
            <div class="level-stat-card">
              <div class="lsc-label">${label}</div>
              <div class="lsc-pct">${pct}%</div>
              <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
              <div class="lsc-sub">${sub}</div>
            </div>`).join('')}
        </div>

        <h3>Topic Checklist</h3>
        <div class="checklist">
          ${checklist.map(item => `
            <div class="checklist-item ${item.state}" onclick="APP.toggleChecklist('${level}','${item.id}')">
              <div class="check-icon">${item.state === 'mastered' ? '✅' : item.state === 'learning' ? '📖' : '⭕'}</div>
              <div class="check-label">${item.label}</div>
              <div class="check-type">${item.type}</div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function toggleChecklist(level, itemId) {
    PROGRESS.toggleChecklistItem(level, itemId);
    document.getElementById('level-progress-detail').innerHTML = renderLevelDetail(level);
  }

  function showImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = STORAGE.importData(ev.target.result);
        showToast(result.message, result.success ? 'success' : 'error');
        if (result.success) renderProgress();
      };
      reader.readAsText(file);
    };
    input.click();
  }

  async function syncGist() {
    const settings = STORAGE.getSettings();
    if (!settings.gistToken) { showToast('Add GitHub token in Settings first.', 'warning'); navigate('settings'); return; }
    showToast('Syncing...', 'info');
    const result = await STORAGE.syncToGist();
    showToast(result.message, result.success ? 'success' : 'error');
  }

  // ═══════════════════════════════════════════════
  // EXAM GUIDE
  // ═══════════════════════════════════════════════

  function renderExamGuide() {
    const main = document.getElementById('main-content');
    const levels = ['A1','A2','B1','B2','C1'];
    const info = {
      A1:{ modules:'4 modules: Hören, Lesen, Schreiben, Sprechen', time:'65 min total', pass:'Each module: 60%', speaking:'~15 min, in pairs, no preparation time', writing:'1 task: form/short message (20 min)', notes:'Entry level. Everyday vocabulary, basic sentences.' },
      A2:{ modules:'4 modules: Hören, Lesen, Schreiben, Sprechen', time:'80 min total', pass:'Each module: 60%', speaking:'~10–15 min, in pairs, 60s prep', writing:'2 tasks: message + semi-formal email (30 min)', notes:'Elementary. Daily life, routines, familiar topics.' },
      B1:{ modules:'4 modules (modular — each must pass independently)', time:'~3 hrs total (split across 2 days)', pass:'Each module independently: 60%', speaking:'~15 min, 2 min prep: presentation + joint planning', writing:'2 tasks: personal message + semi-formal letter (65 min)', notes:'Independent user. Can handle familiar situations, give opinions.' },
      B2:{ modules:'4 modules (modular)', time:'~3.5 hrs total', pass:'Each module independently: 60%', speaking:'~20 min, 5 min prep: argumentation + moderated discussion', writing:'1 long task: argumentative essay (75 min)', notes:'Advanced. Can discuss abstract topics, defend positions.' },
      C1:{ modules:'4 modules (modular)', time:'~4 hrs total', pass:'Each module independently: 60%', speaking:'~15–20 min, 15 min prep: complex presentation + academic debate', writing:'1 long task: academic essay (80 min)', notes:'Proficient. University-level German. Near-native fluency expected.' }
    };

    let activeLevel = state.level;

    main.innerHTML = `<div class="screen-pad">
      <h1>📋 Exam Guide — Goethe-Zertifikat</h1>
      <p class="guide-intro">Complete exam format, scoring, and preparation tips for each level.</p>

      <div class="exam-tabs" id="exam-tabs">
        ${levels.map(l => `<button class="exam-tab ${l === activeLevel ? 'active' : ''}" onclick="APP.showExamLevel('${l}')">${l}</button>`).join('')}
      </div>

      <div id="exam-content">
        ${renderExamLevel(activeLevel, info[activeLevel])}
      </div>
    </div>`;
  }

  function showExamLevel(level) {
    document.querySelectorAll('.exam-tab').forEach(t => t.classList.toggle('active', t.textContent === level));
    const info = {
      A1:{ modules:'4 modules: Hören, Lesen, Schreiben, Sprechen', time:'65 min total', pass:'Each module: 60%', speaking:'~15 min, in pairs, no preparation time', writing:'1 task: form/short message (20 min)', notes:'Entry level. Everyday vocabulary, basic sentences.' },
      A2:{ modules:'4 modules: Hören, Lesen, Schreiben, Sprechen', time:'80 min total', pass:'Each module: 60%', speaking:'~10–15 min, in pairs, 60s prep', writing:'2 tasks: message + semi-formal email (30 min)', notes:'Elementary. Daily life, routines, familiar topics.' },
      B1:{ modules:'4 modules (modular — each must pass independently)', time:'~3 hrs total (split across 2 days)', pass:'Each module independently: 60%', speaking:'~15 min, 2 min prep: presentation + joint planning', writing:'2 tasks: personal message + semi-formal letter (65 min)', notes:'Independent user. Can handle familiar situations, give opinions.' },
      B2:{ modules:'4 modules (modular)', time:'~3.5 hrs total', pass:'Each module independently: 60%', speaking:'~20 min, 5 min prep: argumentation + moderated discussion', writing:'1 long task: argumentative essay (75 min)', notes:'Advanced. Can discuss abstract topics, defend positions.' },
      C1:{ modules:'4 modules (modular)', time:'~4 hrs total', pass:'Each module independently: 60%', speaking:'~15–20 min, 15 min prep: complex presentation + academic debate', writing:'1 long task: academic essay (80 min)', notes:'Proficient. University-level German. Near-native fluency expected.' }
    };
    document.getElementById('exam-content').innerHTML = renderExamLevel(level, info[level]);
  }

  function renderExamLevel(level, info) {
    const skillTips = {
      Hören:['Listen for key words, not every word','Practice with Deutsche Welle podcasts','Note-taking helps at B2+'],
      Lesen:['Scan for structure first, then read carefully','Unknown words: use context','At C1, read German newspapers daily'],
      Schreiben:['Always check word count','Use the phrase banks as a guide','Leave 5 min to review at the end'],
      Sprechen:['Use prep time to write key phrases','Start with a clear statement','It\'s OK to ask partner to repeat']
    };
    return `<div class="exam-level-panel">
      <h2>Goethe-Zertifikat ${level}</h2>
      <div class="exam-info-grid">
        <div class="exam-info-card">
          <h3>📋 Structure</h3>
          <p>${info.modules}</p>
        </div>
        <div class="exam-info-card">
          <h3>⏱ Time</h3>
          <p>${info.time}</p>
        </div>
        <div class="exam-info-card">
          <h3>✅ Pass mark</h3>
          <p>${info.pass}</p>
        </div>
        <div class="exam-info-card">
          <h3>🎤 Speaking</h3>
          <p>${info.speaking}</p>
        </div>
        <div class="exam-info-card">
          <h3>✏️ Writing</h3>
          <p>${info.writing}</p>
        </div>
        <div class="exam-info-card highlight">
          <h3>📝 What to expect</h3>
          <p>${info.notes}</p>
        </div>
      </div>

      <h3>Tips by Skill</h3>
      <div class="tips-grid">
        ${Object.entries(skillTips).map(([skill, tips]) => `
          <div class="tip-block">
            <h4>${skill}</h4>
            <ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
    </div>`;
  }

  // ═══════════════════════════════════════════════
  // SETTINGS
  // ═══════════════════════════════════════════════

  function renderSettings() {
    const main = document.getElementById('main-content');
    const settings = STORAGE.getSettings();

    main.innerHTML = `<div class="screen-pad">
      <h1>⚙️ Settings</h1>

      <div class="settings-section">
        <h3>🔑 AI Assist (optional)</h3>
        <p class="settings-desc">Enter your own Anthropic API key for AI-powered writing and speaking feedback. Your key is stored only in your browser and never sent anywhere except Anthropic's API.</p>
        <div class="settings-row">
          <label>Anthropic API Key</label>
          <input type="password" id="api-key-input" value="${settings.apiKey || ''}" placeholder="sk-ant-..." class="settings-input">
        </div>
        <button class="btn-primary" onclick="APP.saveApiKey()">Save Key</button>
        <button class="btn-secondary" onclick="APP.clearApiKey()">Clear Key</button>
        <p class="settings-note">Your key is used only when you tap "AI Feedback". You see a token estimate before each call. Keys never leave your browser (except to Anthropic's API).</p>
      </div>

      <div class="settings-section">
        <h3>📚 Current Level</h3>
        <div class="level-select-row">
          ${PROGRESS.LEVELS.map(l => `
            <button class="level-btn ${settings.currentLevel === l ? 'active' : ''} ${PROGRESS.isLevelUnlocked(l) ? '' : 'locked'}"
              onclick="APP.setLevel('${l}')">
              ${l}${PROGRESS.isLevelUnlocked(l) ? '' : ' 🔒'}
            </button>`).join('')}
        </div>
      </div>

      <div class="settings-section">
        <h3>🎨 Theme</h3>
        <div class="theme-row">
          ${['auto','light','dark'].map(t => `
            <button class="theme-btn ${settings.theme === t ? 'active' : ''}" onclick="APP.setTheme('${t}')">
              ${t === 'auto' ? '🖥️ Auto' : t === 'light' ? '☀️ Light' : '🌙 Dark'}
            </button>`).join('')}
        </div>
      </div>

      <div class="settings-section">
        <h3>⏱ Session Length</h3>
        <div class="settings-row">
          <label>Max session minutes</label>
          <input type="range" min="10" max="60" step="5" value="${settings.sessionMaxMins || 20}" id="session-mins-input"
            oninput="document.getElementById('session-mins-val').textContent=this.value">
          <span id="session-mins-val">${settings.sessionMaxMins || 20}</span> min
        </div>
        <button class="btn-secondary" onclick="APP.saveSessionLength()">Save</button>
      </div>

      <div class="settings-section">
        <h3>☁️ GitHub Gist Sync (optional)</h3>
        <p class="settings-desc">Save your progress to a private GitHub Gist so it survives browser clearing. Requires a GitHub personal access token with 'gist' permission.</p>
        <div class="settings-row">
          <label>GitHub Token</label>
          <input type="password" id="gist-token-input" value="${settings.gistToken || ''}" placeholder="ghp_..." class="settings-input">
        </div>
        <div class="settings-row">
          <label>Gist ID (auto-filled after first sync)</label>
          <input type="text" id="gist-id-input" value="${settings.gistId || ''}" placeholder="auto-filled" class="settings-input">
        </div>
        <button class="btn-primary" onclick="APP.saveGistSettings()">Save Gist Settings</button>
        <button class="btn-secondary" onclick="APP.syncGist()">Sync Now</button>
        ${settings.lastSync ? `<p class="settings-note">Last synced: ${new Date(settings.lastSync).toLocaleString()}</p>` : ''}
      </div>

      <div class="settings-section danger-zone">
        <h3>⚠️ Data</h3>
        <button class="btn-secondary" onclick="STORAGE.exportData()">📥 Export All Progress</button>
        <button class="btn-secondary" onclick="APP.showImport()">📤 Import Progress</button>
        <button class="btn-danger" onclick="APP.confirmClearAll()">🗑 Clear All Data</button>
      </div>
    </div>`;
  }

  function saveApiKey() {
    const key = document.getElementById('api-key-input')?.value?.trim();
    STORAGE.saveSettings({ apiKey: key });
    showToast('API key saved ✓', 'success');
  }

  function clearApiKey() {
    STORAGE.saveSettings({ apiKey: '' });
    if (document.getElementById('api-key-input')) document.getElementById('api-key-input').value = '';
    showToast('API key cleared', 'info');
  }

  function saveGistSettings() {
    const token = document.getElementById('gist-token-input')?.value?.trim();
    const gistId = document.getElementById('gist-id-input')?.value?.trim();
    STORAGE.saveSettings({ gistToken: token, gistId: gistId });
    showToast('Gist settings saved ✓', 'success');
  }

  function saveSessionLength() {
    const val = parseInt(document.getElementById('session-mins-input')?.value || '20');
    STORAGE.saveSettings({ sessionMaxMins: val });
    showToast(`Session length set to ${val} min`, 'success');
  }

  function setTheme(theme) {
    state.theme = theme;
    STORAGE.saveSettings({ theme });
    applyTheme(theme);
    renderTopBar();
    renderSettings();
  }

  function confirmClearAll() {
    if (confirm('Delete ALL progress data? This cannot be undone.')) {
      STORAGE.clearAll();
      location.reload();
    }
  }

  // ═══════════════════════════════════════════════
  // TOPICS OVERVIEW
  // ═══════════════════════════════════════════════

  function renderTopics() {
    const main = document.getElementById('main-content');
    const vocabTopics = VOCAB_HELPERS.topics(state.level);
    const grammarTopics = GRAMMAR_HELPERS.topics(state.level);

    main.innerHTML = `<div class="screen-pad">
      <h1>📚 Topics — ${state.level}</h1>

      <div class="topics-section">
        <h2>Vocabulary Topics</h2>
        <div class="topics-grid">
          ${vocabTopics.map(t => {
            const count = VOCAB_HELPERS.byLevelAndTopic(state.level, t).length;
            const state2 = STORAGE.getTopicState(state.level, 'vocab_'+t);
            return `<div class="topic-tile ${state2}" onclick="APP.navigate('vocab')">
              <div class="tt-icon">${state2 === 'mastered' ? '✅' : state2 === 'learning' ? '📖' : '⭕'}</div>
              <div class="tt-name">${t}</div>
              <div class="tt-count">${count} words</div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div class="topics-section">
        <h2>Grammar Topics</h2>
        <div class="topics-grid">
          ${grammarTopics.map(t => {
            const rules = window.DB_GRAMMAR.filter(g => g.level === state.level && g.topic === t);
            const state2 = STORAGE.getTopicState(state.level, 'grammar_'+t);
            return `<div class="topic-tile ${state2}" onclick="APP.navigate('grammar')">
              <div class="tt-icon">${state2 === 'mastered' ? '✅' : state2 === 'learning' ? '📖' : '⭕'}</div>
              <div class="tt-name">${t}</div>
              <div class="tt-count">${rules.length} rule${rules.length > 1 ? 's' : ''}</div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  }

  // ═══════════════════════════════════════════════
  // HOW TO USE
  // ═══════════════════════════════════════════════

  function renderHowTo() {
    const main = document.getElementById('main-content');
    main.innerHTML = `<div class="screen-pad howto">
      <h1>❓ How to Use DeutschLern</h1>

      <div class="howto-section">
        <h2>🚀 Getting Started</h2>
        <ol>
          <li>Your current level is shown in the top bar. Start at <b>A1</b> and work up.</li>
          <li>Check your <b>Dashboard</b> every day — it shows a personalised 15–25 min plan.</li>
          <li>Complete the plan to earn XP and keep your streak going.</li>
          <li>Each level unlocks when you reach 60% progress on the previous one.</li>
        </ol>
      </div>

      <div class="howto-section">
        <h2>🃏 Vocabulary Flashcards</h2>
        <p>Cards use <b>spaced repetition</b> — you'll see difficult words more often.</p>
        <ul>
          <li>Tap the card to reveal the translation</li>
          <li>Rate yourself: <b>Hard</b> (see again tomorrow), <b>OK</b> (3 days), <b>Easy</b> (7+ days)</li>
          <li>Cards marked Easy enough times become "Mastered"</li>
        </ul>
      </div>

      <div class="howto-section">
        <h2>📐 Grammar</h2>
        <ul>
          <li>Read the explanation, then work through the exercises</li>
          <li>Score 80%+ twice to mark a topic as Mastered</li>
          <li>Common errors are shown — study them carefully!</li>
        </ul>
      </div>

      <div class="howto-section">
        <h2>✏️ Writing</h2>
        <ul>
          <li>Use the scaffold template (lower levels) or write freely (higher levels)</li>
          <li>Check the phrase bank for useful expressions</li>
          <li>Submit for automated feedback — score, grammar issues, missing elements</li>
          <li><b>AI Assist</b> (optional): Enable the toggle + add your API key for deeper feedback</li>
        </ul>
      </div>

      <div class="howto-section">
        <h2>🎤 Speaking</h2>
        <ul>
          <li>Click the microphone and speak in German — Chrome works best</li>
          <li>Your speech is transcribed and assessed automatically</li>
          <li>Pronunciation cannot be assessed — use the score as a content guide</li>
          <li>You can also type your response if the mic doesn't work</li>
        </ul>
      </div>

      <div class="howto-section">
        <h2>✨ AI Assist</h2>
        <ul>
          <li>Go to <b>Settings</b> and enter your own Anthropic API key</li>
          <li>Enable the AI toggle in the top bar</li>
          <li>You'll see a token estimate before each AI call — you're in control</li>
          <li>AI feedback is most useful for B2+ writing and C1 speaking</li>
          <li><b>Your key is stored only in your browser</b> — never visible to anyone else</li>
        </ul>
      </div>

      <div class="howto-section">
        <h2>📊 Progress & Sync</h2>
        <ul>
          <li>Progress is saved automatically to your browser's local storage</li>
          <li>Use <b>Export Progress</b> to save a backup file</li>
          <li>Optional: sync to a private <b>GitHub Gist</b> — add your token in Settings</li>
          <li>Manually tick topics in the Progress checklist if you've practised elsewhere</li>
        </ul>
      </div>

      <div class="howto-section">
        <h2>🎓 Exam Path</h2>
        <p>Check the <b>Exam Guide</b> for full details on each Goethe-Zertifikat level.</p>
        <ul>
          <li>University entry: minimum B2, ideally C1</li>
          <li>TestDaF is an alternative to Goethe C1 for university admission</li>
          <li>Each module (Hören/Lesen/Schreiben/Sprechen) must pass independently at B1+</li>
        </ul>
      </div>
    </div>`;
  }

  // ═══════════════════════════════════════════════
  // ANTHROPIC API CALL
  // ═══════════════════════════════════════════════

  async function callAnthropicAPI(apiKey, userPrompt) {
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: userPrompt }]
        })
      });
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error?.message || `API error ${resp.status}`);
      }
      const data = await resp.json();
      return data.content?.[0]?.text || 'No response';
    } catch(e) {
      return `AI Error: ${e.message}. Check your API key in Settings.`;
    }
  }

  // ═══════════════════════════════════════════════
  // THEME
  // ═══════════════════════════════════════════════

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light','dark');
      // Auto: follow system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    }
  }

  // ═══════════════════════════════════════════════
  // LEVEL MANAGEMENT
  // ═══════════════════════════════════════════════

  function setLevel(level) {
    if (!PROGRESS.isLevelUnlocked(level)) {
      showToast(`Complete ${PROGRESS.LEVELS[PROGRESS.LEVELS.indexOf(level)-1]} first to unlock ${level}`, 'warning');
      return;
    }
    state.level = level;
    STORAGE.saveSettings({ currentLevel: level });
    renderTopBar();
    renderSideNav();
    navigate(state.screen);
  }

  // ═══════════════════════════════════════════════
  // AI TOGGLE
  // ═══════════════════════════════════════════════

  function toggleAI() {
    state.aiAssist = !state.aiAssist;
    STORAGE.saveSettings({ aiAssist: state.aiAssist });
    renderTopBar();
    showToast(`AI Assist ${state.aiAssist ? 'enabled ✨' : 'disabled'}`, 'info');
  }

  // ═══════════════════════════════════════════════
  // CYCLE THEME
  // ═══════════════════════════════════════════════

  function cycleTheme() {
    const themes = ['auto','light','dark'];
    const next = themes[(themes.indexOf(state.theme) + 1) % themes.length];
    setTheme(next);
  }

  // ═══════════════════════════════════════════════
  // TOAST NOTIFICATIONS
  // ═══════════════════════════════════════════════

  function showToast(message, type = 'info') {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `toast toast-${type} show`;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ═══════════════════════════════════════════════
  // CONFETTI
  // ═══════════════════════════════════════════════

  function triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({length:80}, () => ({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height*0.5-canvas.height*0.5,
      r: Math.random()*6+3,
      d: Math.random()*3+1,
      color: ['#534AB7','#2ecc71','#f39c12','#e74c3c','#3498db'][Math.floor(Math.random()*5)],
      vx:(Math.random()-0.5)*2
    }));
    let frame = 0;
    const anim = setInterval(() => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p => {
        p.y += p.d; p.x += p.vx;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = p.color; ctx.fill();
      });
      if (++frame > 120) { clearInterval(anim); canvas.remove(); }
    }, 16);
  }

  // ═══════════════════════════════════════════════
  // MILESTONES
  // ═══════════════════════════════════════════════

  function checkAndShowMilestones() {
    const milestones = PROGRESS.checkMilestones();
    milestones.forEach((m, i) => {
      setTimeout(() => showToast(m.message, 'success'), i * 800);
    });
    if (milestones.some(m => m.type === 'level')) triggerConfetti();
  }

  // Public API
  return {
    init, navigate, setLevel, toggleAI, cycleTheme,
    // Vocab
    flipCard, vocabAnswer,
    // Grammar
    openGrammarRule, submitExercise, nextExercise,
    // Writing
    openWritingPrompt, updateWordCount, submitWriting, submitWritingAI,
    // Speaking
    openSpeakingPrompt, toggleRecording, clearTranscript, toggleTranscriptEdit, submitSpeaking, submitSpeakingAI,
    // Progress
    toggleChecklist, showImport, syncGist,
    // Exam
    showExamLevel,
    // Settings
    saveApiKey, clearApiKey, saveGistSettings, saveSessionLength, setTheme, confirmClearAll,
    // Plan
    startPlanItem,
    // Util
    showToast, triggerConfetti
  };

})();

// Auto-init when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => APP.init());
} else {
  APP.init();
}
