// DeutschLern — Assessment Engine
// Offline rule-based assessment for writing, speaking transcripts, and exercises
// No API needed for A1–B1; AI recommended for B2–C1 writing/speaking quality

window.ASSESSMENT = (() => {

  // ═══════════════════════════════════════════════
  // UTILITIES
  // ═══════════════════════════════════════════════

  const norm = (s) => s.trim().toLowerCase().replace(/[.,!?;:]/g,'');
  const normFull = (s) => s.trim().toLowerCase();

  function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  function containsPhrase(text, phrase) {
    return normFull(text).includes(normFull(phrase));
  }

  function containsAny(text, arr) {
    const t = normFull(text);
    return arr.some(p => t.includes(normFull(p)));
  }

  function matchRegex(text, pattern, flags='i') {
    return new RegExp(pattern, flags).test(text);
  }

  // ═══════════════════════════════════════════════
  // EXERCISE ASSESSOR
  // Handles all exercise types from db-grammar.js
  // ═══════════════════════════════════════════════

  const Exercise = {

    fillBlank(userAnswer, correctAnswer) {
      if (Array.isArray(correctAnswer)) {
        // Multiple blanks
        if (!Array.isArray(userAnswer)) userAnswer = [userAnswer];
        const correct = userAnswer.map((a,i) =>
          norm(a) === norm(correctAnswer[i] || '')
        );
        const score = correct.filter(Boolean).length / correctAnswer.length;
        return {
          score: Math.round(score * 100),
          correct: score === 1,
          feedback: correct.map((c,i) => c
            ? `✓ Blank ${i+1} correct`
            : `✗ Blank ${i+1}: expected "${correctAnswer[i]}", got "${userAnswer[i]}"`
          )
        };
      }
      const ok = norm(userAnswer) === norm(correctAnswer);
      return {
        score: ok ? 100 : 0,
        correct: ok,
        feedback: ok
          ? [`✓ Correct: "${correctAnswer}"`]
          : [`✗ Expected "${correctAnswer}", you wrote "${userAnswer}"`]
      };
    },

    choice(userAnswer, correctAnswer) {
      const ok = norm(userAnswer) === norm(correctAnswer);
      return {
        score: ok ? 100 : 0,
        correct: ok,
        feedback: ok ? ['✓ Correct!'] : [`✗ The correct answer is "${correctAnswer}"`]
      };
    },

    wordOrder(userSentence, correctSentence) {
      const u = norm(userSentence);
      const c = norm(correctSentence);
      if (u === c) return { score:100, correct:true, feedback:['✓ Perfect word order!'] };

      const feedback = [];
      // Check verb in position 2
      const words = userSentence.trim().split(/\s+/);
      const correctWords = correctSentence.trim().split(/\s+/);

      if (words.length !== correctWords.length) {
        feedback.push(`Word count differs: you have ${words.length}, expected ${correctWords.length}`);
      }

      // Check if first word matches
      if (norm(words[0]) !== norm(correctWords[0])) {
        feedback.push(`Check the first element — does your sentence start with the right word?`);
      }

      // Check verb position (index 1 = position 2)
      if (norm(words[1]) !== norm(correctWords[1])) {
        feedback.push(`Remember: the verb must be in POSITION 2 (second element) in German main clauses.`);
      }

      // Check ending (often infinitive or participle)
      const lastUser = words[words.length-1];
      const lastCorrect = correctWords[correctWords.length-1];
      if (norm(lastUser) !== norm(lastCorrect)) {
        feedback.push(`Check the end of the sentence — infinitives and participles go last.`);
      }

      const score = feedback.length === 0 ? 80 : Math.max(0, 60 - feedback.length * 20);
      return { score, correct: false, feedback: feedback.length ? feedback : [`✗ Expected: "${correctSentence}"`] };
    },

    errorCorrect(userAnswer, correctAnswer) {
      const u = norm(userAnswer);
      const c = norm(correctAnswer);
      if (u === c) return { score:100, correct:true, feedback:['✓ Correct!'] };

      // Check if user found and fixed the error
      const feedback = [`Expected: "${correctAnswer}"`];
      return { score: 0, correct: false, feedback };
    },

    conjugation(userForms, correctForms) {
      // correctForms = { ich: 'lerne', du: 'lernst', ... }
      const pronouns = Object.keys(correctForms);
      let correctCount = 0;
      const feedback = [];
      pronouns.forEach(p => {
        const ok = norm(userForms[p]||'') === norm(correctForms[p]);
        if (ok) correctCount++;
        else feedback.push(`✗ ${p}: expected "${correctForms[p]}", got "${userForms[p]||'?'}"`);
      });
      const score = Math.round((correctCount / pronouns.length) * 100);
      return {
        score,
        correct: score === 100,
        feedback: feedback.length ? feedback : ['✓ All forms correct!']
      };
    },

    transform(userAnswer, correctAnswer) {
      // Fuzzy match for transform exercises
      const u = norm(userAnswer);
      const c = norm(correctAnswer);
      if (u === c) return { score:100, correct:true, feedback:['✓ Perfect!'] };

      // Partial credit — check key elements
      const keyWords = correctAnswer.split(/\s+/).filter(w => w.length > 3);
      const found = keyWords.filter(w => u.includes(norm(w)));
      const ratio = found.length / keyWords.length;
      const score = Math.round(ratio * 80); // max 80 for fuzzy match

      return {
        score,
        correct: false,
        feedback: [
          score >= 60 ? '~ Close! Check the exact form.' : '✗ Review the structure.',
          `Expected: "${correctAnswer}"`
        ]
      };
    },

    article(userAnswer, correctAnswer) {
      return this.choice(userAnswer, correctAnswer);
    }
  };

  // ═══════════════════════════════════════════════
  // GRAMMAR PATTERN CHECKER
  // Checks specific grammar features in free text
  // ═══════════════════════════════════════════════

  const GrammarCheck = {

    // Check verb-final in weil/dass/obwohl clauses
    verbFinalSubordinate(text) {
      const issues = [];
      // Find weil/dass/obwohl clauses and check verb position
      const subordPattern = /\b(weil|dass|obwohl|wenn|ob|nachdem|bevor|während)\b([^.,;!?]{5,40})/gi;
      let m;
      while ((m = subordPattern.exec(text)) !== null) {
        const clause = m[2].trim();
        const words = clause.split(/\s+/);
        // Very basic: check if a conjugated verb appears early (error) vs late (correct)
        // Conjugated verbs often end in -t, -st, -e, -en
        const firstTwoWords = words.slice(0,2).join(' ');
        const verbEarlyPattern = /\b(ist|war|hat|habe|bin|wird|kann|muss|soll)\b/i;
        if (verbEarlyPattern.test(firstTwoWords) && words.length > 3) {
          issues.push(`Check word order in your "${m[1]}" clause — the verb should go to the END.`);
        }
      }
      return issues;
    },

    // Check V2 rule — verb in position 2
    verbSecondPosition(sentence) {
      const issues = [];
      // Time-word inversion check
      const timeWords = /^(heute|morgen|gestern|jetzt|dann|danach|außerdem|trotzdem|deshalb|daher|erstens|zweitens)\b/i;
      if (timeWords.test(sentence.trim())) {
        const words = sentence.trim().split(/\s+/);
        // After the time word (pos 1), word[1] should be a verb-like word
        // Simple heuristic: if word[1] looks like subject pronoun, V2 violated
        const pronouns = ['ich','du','er','sie','es','wir','ihr','man'];
        if (pronouns.includes(norm(words[1]))) {
          issues.push(`After "${words[0]}" remember inversion: ${words[0]} + VERB + subject. E.g. "Heute lerne ich..."`);
        }
      }
      return issues;
    },

    // Check kein vs nicht
    keinVsNicht(text) {
      const issues = [];
      // "nicht ein/eine/einen" → should be kein
      if (/nicht eine?n?\b/i.test(text)) {
        issues.push(`Use "kein/keine/keinen" instead of "nicht ein/eine/einen" to negate nouns.`);
      }
      return issues;
    },

    // Check modal verb + infinitive at end
    modalInfiniteEnd(sentence) {
      const issues = [];
      const modals = ['kann','kannst','muss','musst','will','willst','darf','darfst','soll','sollst','mag','möchte'];
      const words = sentence.trim().replace(/[.,!?]$/,'').split(/\s+/);
      const hasModal = modals.some(m => words.some(w => norm(w) === m));
      if (hasModal) {
        // Last word should be an infinitive (ends in -en usually)
        const lastWord = words[words.length-1];
        if (!lastWord.match(/en$/i) && !lastWord.match(/[a-z]{2,}$/i)) {
          // This is a weak heuristic — don't flag unless sure
        }
      }
      return issues;
    },

    // Check reflexive verbs have reflexive pronoun
    reflexiveVerbCheck(text) {
      const issues = [];
      const reflexiveVerbs = [
        {verb:'freue', pronoun:'mich', hint:'sich freuen requires a reflexive pronoun: ich freue MICH'},
        {verb:'ärgere', pronoun:'mich', hint:'sich ärgern: ich ärgere MICH'},
        {verb:'interessiere', pronoun:'mich', hint:'sich interessieren: ich interessiere MICH für'},
        {verb:'freust', pronoun:'dich', hint:'du freust DICH'},
        {verb:'freut', pronoun:'sich', hint:'er/sie freut SICH'}
      ];
      reflexiveVerbs.forEach(rv => {
        if (text.toLowerCase().includes(rv.verb) && !text.toLowerCase().includes(rv.pronoun)) {
          issues.push(`Check: ${rv.hint}`);
        }
      });
      return issues;
    },

    // Check Perfekt auxiliary (sein vs haben)
    perfektAuxiliary(text) {
      const issues = [];
      // Verbs that take sein
      const seinVerbs = ['gegangen','gefahren','gefallen','geblieben','gestorben','geworden',
        'gelaufen','geflogen','geschwommen','gestiegen','aufgestanden','angekommen','eingeschlafen'];
      seinVerbs.forEach(pp => {
        // Check if used with "habe/hat/haben" instead of "bin/ist/sind"
        const wrongPattern = new RegExp(`\\b(habe|hat|haben|hast|habt)\\b[^.]{0,30}\\b${pp}\\b`,'i');
        if (wrongPattern.test(text)) {
          issues.push(`"${pp}" needs "sein" as auxiliary, not "haben". E.g. "Ich bin gegangen."`);
        }
      });
      return issues;
    },

    // Check separable verb in main clause (prefix should be at end)
    separableVerbs(text) {
      const issues = [];
      const separables = [
        {full:'aufstehen', prefix:'auf', stem:'stehe'},
        {full:'aufmachen', prefix:'auf', stem:'mache'},
        {full:'anfangen', prefix:'an', stem:'fange'},
        {full:'einkaufen', prefix:'ein', stem:'kaufe'},
        {full:'zurückkommen', prefix:'zurück', stem:'komme'},
        {full:'fernsehen', prefix:'fern', stem:'sehe'},
        {full:'mitbringen', prefix:'mit', stem:'bringe'}
      ];
      separables.forEach(sv => {
        // If infinitive form found in a sentence (not after modal/haben/sein), might be error
        const unsplitPattern = new RegExp(`\\b${sv.full}\\b(?!\\s+(kann|muss|will|soll|darf|zu|haben|sein))`, 'i');
        // This heuristic is weak — only flag as suggestion
      });
      return issues;
    },

    // Full grammar check — runs all checks
    checkAll(text, level) {
      const issues = [];
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 3);

      sentences.forEach(s => {
        issues.push(...this.verbFinalSubordinate(s));
        issues.push(...this.verbSecondPosition(s));
        issues.push(...this.keinVsNicht(s));
      });

      issues.push(...this.reflexiveVerbCheck(text));
      issues.push(...this.perfektAuxiliary(text));

      // Deduplicate
      return [...new Set(issues)];
    }
  };

  // ═══════════════════════════════════════════════
  // VOCABULARY SCORER
  // Assesses vocabulary range and level-appropriateness
  // ═══════════════════════════════════════════════

  const VocabScorer = {

    // Discourse markers by level — presence boosts score
    discourseMarkers: {
      A1: ['und','aber','oder','nicht','auch','sehr'],
      A2: ['dann','danach','weil','deshalb','trotzdem','außerdem','zuerst','zuletzt','meistens','manchmal','normalerweise'],
      B1: ['einerseits','andererseits','außerdem','jedoch','obwohl','trotzdem','deshalb','daher','meiner Meinung nach','ich finde','ich denke','zum Beispiel','insgesamt'],
      B2: ['darüber hinaus','im Gegensatz dazu','infolgedessen','zusammenfassend','dem lässt sich entgegenhalten','es lässt sich argumentieren','laut','somit','folglich'],
      C1: ['bei näherer Betrachtung','wenngleich','gleichwohl','insofern als','nichtsdestotrotz','differenzierter betrachtet','abschließend möchte ich festhalten','es drängt sich die frage auf','vor dem hintergrund']
    },

    // Nominalisierung patterns (C1 indicator)
    nominalisierungPattern: /\b(die|das|der)\s+(Entwicklung|Lösung|Verbesserung|Analyse|Betrachtung|Untersuchung|Entscheidung|Veränderung|Wahrnehmung|Umsetzung|Regulierung|Globalisierung|Komplexität|Identität)\b/i,

    // Count discourse markers present
    countMarkers(text, level) {
      const levels = ['A1','A2','B1','B2','C1'];
      const targetIdx = levels.indexOf(level);
      let count = 0;
      let found = [];
      for (let i = 0; i <= targetIdx; i++) {
        (this.discourseMarkers[levels[i]] || []).forEach(m => {
          if (containsPhrase(text, m)) { count++; found.push(m); }
        });
      }
      return { count, found };
    },

    // Check for level-appropriate vocabulary from DB
    checkLevelVocab(text, targetLevel) {
      const levels = ['A1','A2','B1','B2','C1'];
      const targetIdx = levels.indexOf(targetLevel);
      let advancedCount = 0;
      // Check for C1 vocab in a C1 piece, etc.
      window.DB_VOCAB.forEach(v => {
        const vIdx = levels.indexOf(v.level);
        if (vIdx >= targetIdx - 1 && containsPhrase(text, v.de)) {
          advancedCount++;
        }
      });
      return advancedCount;
    },

    // Detect if text is not in German (garbage / wrong language)
    isGerman(text) {
      const germanMarkers = ['ich','die','der','das','und','ist','ein','eine','nicht','mit','auf','sie','er','wir','zu','den','von','für','an','im','dass','aber','auch','wie','als','noch','so','wenn','kann','hat','haben','war','sind','wird','wurde'];
      const englishMarkers = ['the','and','is','are','was','were','have','has','this','that','with','for','you','my','we','they','would','should','could','because','however','therefore','in my opinion','although','students','school','should','allowed'];
      const words = text.toLowerCase().split(/\s+/);
      const germanCount = words.filter(w => germanMarkers.includes(w)).length;
      const englishCount = words.filter(w => englishMarkers.includes(w)).length;
      // Flag as non-German if more English markers than German, or no German markers at all
      if (englishCount > germanCount && englishCount >= 2) return false;
      return words.length > 0 && (germanCount / words.length) > 0.05;
    },

    // Level-appropriate vocabulary bonus — discriminates A1 text from C1 text
    levelDiscrimination(text, targetLevel) {
      const levels = ['A1','A2','B1','B2','C1'];
      const targetIdx = levels.indexOf(targetLevel);
      let levelBonus = 0;
      let levelFeedback = [];

      // Count words from target level and above in DB_VOCAB
      if (window.DB_VOCAB) {
        let advancedHits = 0;
        let belowLevelOnly = 0;
        window.DB_VOCAB.forEach(v => {
          const vIdx = levels.indexOf(v.level);
          const wordPresent = text.toLowerCase().includes(v.de.toLowerCase());
          if (wordPresent) {
            if (vIdx >= targetIdx) advancedHits++;
            else belowLevelOnly++;
          }
        });
        if (advancedHits >= 3) {
          levelBonus += 15;
          levelFeedback.push('✓ Good use of level-appropriate vocabulary.');
        } else if (advancedHits >= 1) {
          levelBonus += 7;
        } else if (belowLevelOnly > 0 && targetIdx >= 2) {
          levelFeedback.push(`Try to use more ${targetLevel}-level vocabulary. Your text currently uses mostly lower-level words.`);
          levelBonus -= 10;
        }
      }

      // Level-specific pattern checks
      if (targetLevel === 'B2' || targetLevel === 'C1') {
        const hasPassive = /\b(wird|werden|wurde|wurden|worden)\b/i.test(text);
        const hasKonjunktiv = /\b(wäre|hätte|könnte|würde|sollte|müsste|dürfte)\b/i.test(text);
        const hasComplex = /\b(wenngleich|gleichwohl|infolgedessen|demzufolge|nichtsdestotrotz|insofern|insofern als)\b/i.test(text);
        if (hasPassive) { levelBonus += 5; levelFeedback.push('✓ Good use of passive constructions.'); }
        if (hasKonjunktiv) { levelBonus += 5; levelFeedback.push('✓ Good use of Konjunktiv II.'); }
        if (targetLevel === 'C1' && hasComplex) { levelBonus += 8; levelFeedback.push('✓ Excellent use of advanced connectors.'); }
      }

      return { bonus: levelBonus, feedback: levelFeedback };
    },

    // Score vocabulary in a piece of writing
    score(text, level, requiredVocab = []) {
      const wordCount = countWords(text);
      const feedback = [];

      // Garbage / non-German detection
      if (wordCount > 3 && !this.isGerman(text)) {
        return {
          score: 10,
          feedback: ['Please write your response in German.'],
          markersFound: []
        };
      }

      const {count: markerCount, found: markersFound} = this.countMarkers(text, level);
      let score = 45; // base

      // Required vocabulary check
      if (requiredVocab.length > 0) {
        const missingRequired = requiredVocab.filter(v => !containsPhrase(text, v));
        const foundRequired = requiredVocab.filter(v => containsPhrase(text, v));
        const reqRatio = foundRequired.length / requiredVocab.length;
        score += reqRatio * 15;
        if (missingRequired.length > 0) {
          feedback.push(`Try to include these key words: ${missingRequired.join(', ')}`);
        } else {
          feedback.push(`✓ Good use of required vocabulary!`);
        }
      }

      // Discourse markers
      if (markerCount >= 4) {
        score += 18;
        feedback.push(`✓ Excellent use of connectors: ${markersFound.slice(0,4).join(', ')}`);
      } else if (markerCount >= 2) {
        score += 10;
        feedback.push(`✓ Good use of connectors: ${markersFound.slice(0,3).join(', ')}`);
      } else if (markerCount === 1) {
        score += 4;
        const suggestions = (this.discourseMarkers[level]||[]).filter(m=>!markersFound.includes(m)).slice(0,3);
        feedback.push(`Add more connecting words. Try: ${suggestions.join(', ')}`);
      } else {
        const suggestions = (this.discourseMarkers[level]||[]).slice(0,4);
        feedback.push(`Missing discourse markers. For ${level} use: ${suggestions.join(', ')}`);
      }

      // Level discrimination bonus
      const levelCheck = this.levelDiscrimination(text, level);
      score += levelCheck.bonus;
      levelCheck.feedback.forEach(f => feedback.push(f));

      // Nominalisierung check for C1/B2
      if (level === 'C1' || level === 'B2') {
        if (this.nominalisierungPattern.test(text)) {
          score += 8;
          feedback.push(`✓ Good use of nominal style (Nominalisierungen).`);
        } else if (level === 'C1') {
          feedback.push(`Use Nominalisierungen (e.g. "die Analyse der Daten" not "die Daten analysieren") for C1 academic style.`);
        }
      }

      // Word count feedback
      if (wordCount < 20) {
        score = Math.min(score, 30);
        feedback.push(`Your response is too short (${wordCount} words). Aim to write more.`);
      }

      return { score: Math.min(100, Math.max(0, Math.round(score))), feedback, markersFound };
    }
  };

  // ═══════════════════════════════════════════════
  // CONTENT COVERAGE CHECKER
  // Checks that required elements and phrases are present
  // ═══════════════════════════════════════════════

  const ContentChecker = {

    check(text, prompt) {
      const feedback = [];
      let covered = 0;
      let total = 0;

      // Check required elements
      if (prompt.requiredElements && prompt.requiredElements.length) {
        const elementMap = {
          'greeting': /\b(hallo|guten (tag|morgen|abend)|sehr geehrte|liebe[rs]?)\b/i,
          'sign-off': /\b(tschüss|auf wiedersehen|mit freundlichen grüßen|liebe grüße|bis (bald|dann|morgen))\b/i,
          'formal greeting': /\bsehr geehrte/i,
          'formal sign-off': /\bmit freundlichen grüßen\b/i,
          'opinion': /\b(meinung|finde|denke|glaube|ansicht|standpunkt)\b/i,
          'conclusion': /\b(insgesamt|zusammenfassend|abschließend|fazit|letztendlich|alles in allem)\b/i,
          'thesis': /\b(these|behaupten|meinung nach|ansicht nach|argumentiere)\b/i,
          'counter-argument': /\b(entgegenhalten|andererseits|allerdings|jedoch|obwohl|dagegen|kritiker|einwand)\b/i,
          'evidence': /\b(studie|belegt|zeigt|laut|forschung|statistik|beispiel|etwa)\b/i
        };

        prompt.requiredElements.forEach(el => {
          total++;
          const pattern = elementMap[el.toLowerCase()];
          if (pattern && pattern.test(text)) {
            covered++;
          } else if (!pattern) {
            // Try phrase match
            if (containsPhrase(text, el)) { covered++; }
            else feedback.push(`Make sure to include: ${el}`);
          } else {
            feedback.push(`Missing element: ${el} — check your ${el} section`);
          }
        });
      }

      // Check required phrases
      if (prompt.requiredPhrases && prompt.requiredPhrases.length) {
        prompt.requiredPhrases.forEach(phrase => {
          total++;
          if (containsPhrase(text, phrase)) {
            covered++;
          } else {
            feedback.push(`Try to use the phrase: "${phrase}"`);
          }
        });
      }

      // Check required grammar features
      if (prompt.requiredGrammar && prompt.requiredGrammar.length) {
        const grammarMap = {
          'dass-clause': /\bdass\b.{3,40}(ist|hat|sind|werden|kann|wird|wurde)\b/i,
          'weil': /\bweil\b/i,
          'weil or dass': /\b(weil|dass)\b/i,
          'weil or obwohl': /\b(weil|obwohl)\b/i,
          'Konjunktiv II': /\b(würde|wäre|hätte|könnte|müsste|sollte|dürfte)\b/i,
          'Passive voice': /\b(wird|werden|wurde|wurden|worden)\b.{0,20}(ge[a-z]+t|ge[a-z]+en)\b/i,
          'Passive': /\b(wird|werden|wurde|wurden)\b.{0,20}(ge[a-z]+[tn])\b/i,
          'Perfekt': /\b(habe|hat|haben|bin|ist|sind)\b.{0,20}(ge[a-z]+[tn])\b/i,
          'Nominalisierung': /\b(die|das|der)\s+[A-ZÄÖÜ][a-zäöüß]+(ung|heit|keit|schaft|ismus|ion)\b/,
          'Partizipialkonstruktion': /\b(der|die|das)\s+[a-zäöüß]+(ende|ende[rns]|te|ten|te[rns])\s+[A-ZÄÖÜ]/,
          'Konjunktiv I': /\b(sei|habe|werde|komme|gehe|könne|müsse)\b/i,
          'um-zu': /\bum\b.{1,30}\bzu\b/i,
          'relative clause': /\b(der|die|das|dem|den|dessen|deren)\b.{3,40}(ist|hat|wird|kann|war|hatte)\b/i
        };

        prompt.requiredGrammar.forEach(feat => {
          total++;
          const pat = grammarMap[feat];
          if (pat && pat.test(text)) {
            covered++;
            feedback.push(`✓ Good use of ${feat}`);
          } else {
            feedback.push(`Try to use ${feat} in your writing`);
          }
        });
      }

      const ratio = total > 0 ? covered / total : 1;
      return {
        score: Math.round(ratio * 100),
        covered,
        total,
        feedback
      };
    }
  };

  // ═══════════════════════════════════════════════
  // STRUCTURE CHECKER
  // Checks paragraph structure, length, formatting
  // ═══════════════════════════════════════════════

  const StructureChecker = {

    check(text, prompt) {
      const feedback = [];
      let score = 70;
      const wordCount = countWords(text);
      const {min, max} = prompt.wordCount || {min:30, max:500};

      // Word count
      if (wordCount < min) {
        score -= 20;
        feedback.push(`Too short: ${wordCount} words (minimum ${min}). Add more detail.`);
      } else if (wordCount > max * 1.3) {
        score -= 10;
        feedback.push(`Slightly long: ${wordCount} words (maximum ~${max}). Be more concise.`);
      } else {
        score += 10;
        feedback.push(`✓ Good length: ${wordCount} words`);
      }

      // Paragraph structure (more than 80 words should have paragraphs)
      if (wordCount > 80) {
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 10);
        if (paragraphs.length < 2) {
          score -= 10;
          feedback.push(`Divide your text into paragraphs — use a blank line between sections.`);
        } else {
          feedback.push(`✓ Good paragraph structure (${paragraphs.length} paragraphs)`);
        }
      }

      // Opening sentence
      const opening = text.trim().split('\n')[0];
      if (opening.length < 10) {
        feedback.push(`Start with a clear opening sentence.`);
      }

      return { score: Math.min(100, Math.max(0, score)), feedback };
    }
  };

  // ═══════════════════════════════════════════════
  // WRITING ASSESSOR — main entry point for writing
  // ═══════════════════════════════════════════════

  const Writing = {

    assess(text, promptObj) {
      const level = promptObj.level;
      const wc = countWords(text);

      if (wc < 5) {
        return {
          totalScore: 0,
          grade: 'F',
          breakdown: {},
          feedback: ['Please write something first!'],
          readyForAI: false
        };
      }

      // Language check — non-German input
      if (wc >= 5 && !VocabScorer.isGerman(text)) {
        return {
          totalScore: 15,
          grade: 'F',
          breakdown: {},
          feedback: ['Please write your response in German. Your text appears to be in another language.'],
          positiveFeedback: [],
          wordCount: wc,
          readyForAI: false
        };
      }

      // Run all checks
      const grammar = GrammarCheck.checkAll(text, level);
      const vocab = VocabScorer.score(text, level, promptObj.requiredVocab || []);
      const content = ContentChecker.check(text, promptObj);
      const structure = StructureChecker.check(text, promptObj);

      // Grammar score (inverted — fewer issues = higher score)
      const grammarScore = Math.max(20, 100 - grammar.length * 15);

      // Weighted total based on rubric
      const rubric = promptObj.rubric || {};
      let total = 0;
      let weightSum = 0;

      const breakdown = {};

      if (rubric.content) {
        breakdown.content = { score: content.score, weight: rubric.content.weight, feedback: content.feedback };
        total += content.score * rubric.content.weight;
        weightSum += rubric.content.weight;
      }
      if (rubric.vocabulary) {
        breakdown.vocabulary = { score: vocab.score, weight: rubric.vocabulary.weight, feedback: vocab.feedback };
        total += vocab.score * rubric.vocabulary.weight;
        weightSum += rubric.vocabulary.weight;
      }
      if (rubric.grammar) {
        breakdown.grammar = { score: grammarScore, weight: rubric.grammar.weight, feedback: grammar.length ? grammar : ['✓ No obvious grammar issues detected'] };
        total += grammarScore * rubric.grammar.weight;
        weightSum += rubric.grammar.weight;
      }
      if (rubric.structure) {
        breakdown.structure = { score: structure.score, weight: rubric.structure.weight, feedback: structure.feedback };
        total += structure.score * rubric.structure.weight;
        weightSum += rubric.structure.weight;
      }
      if (rubric.register) {
        const regScore = this._checkRegister(text, level);
        breakdown.register = { score: regScore.score, weight: rubric.register.weight, feedback: regScore.feedback };
        total += regScore.score * rubric.register.weight;
        weightSum += rubric.register.weight;
      }

      const totalScore = weightSum > 0 ? Math.round(total / weightSum) : Math.round((content.score + vocab.score + grammarScore + structure.score) / 4);

      // Compile all feedback
      const allFeedback = [];
      Object.values(breakdown).forEach(b => {
        if (b.feedback) allFeedback.push(...b.feedback.filter(f => f && !f.startsWith('✓')));
      });
      const positiveFeedback = [];
      Object.values(breakdown).forEach(b => {
        if (b.feedback) positiveFeedback.push(...b.feedback.filter(f => f && f.startsWith('✓')));
      });

      return {
        totalScore,
        grade: this._scoreToGrade(totalScore),
        breakdown,
        feedback: allFeedback.slice(0, 5),
        positiveFeedback: positiveFeedback.slice(0, 3),
        wordCount: wc,
        readyForAI: promptObj.aiAssistRecommended || promptObj.aiAssistSuggested || false,
        aiReason: promptObj.aiAssistReason || null
      };
    },

    _checkRegister(text, level) {
      const feedback = [];
      let score = 80;
      // Check for informal markers in formal contexts
      const informalPatterns = [/\bhi\b/i, /\bhey\b/i, /\btschüss\b/i, /\blol\b/i, /\bumg\b/i];
      const formalMarkers = [/sehr geehrte/i, /mit freundlichen grüßen/i, /ich möchte/i];

      informalPatterns.forEach(p => {
        if (p.test(text)) { score -= 15; feedback.push(`Avoid informal language in this task type.`); }
      });
      if (level === 'C1' || level === 'B2') {
        if (!formalMarkers.some(p => p.test(text))) {
          score -= 10;
          feedback.push(`Use formal language markers appropriate for ${level} level.`);
        }
      }
      return { score: Math.max(0, score), feedback };
    },

    _scoreToGrade(score) {
      if (score >= 90) return 'A';
      if (score >= 80) return 'B';
      if (score >= 70) return 'C';
      if (score >= 60) return 'D';
      if (score >= 50) return 'E';
      return 'F';
    }
  };

  // ═══════════════════════════════════════════════
  // SPEAKING ASSESSOR — for Web Speech API transcripts
  // ═══════════════════════════════════════════════

  const Speaking = {

    assess(transcript, promptObj) {
      const level = promptObj.level;
      const wc = countWords(transcript);

      if (wc < 3) {
        return {
          totalScore: 0,
          feedback: ['No speech detected. Please try again.'],
          breakdown: {}
        };
      }

      // Content coverage
      const content = ContentChecker.check(transcript, promptObj);

      // Vocabulary
      const vocab = VocabScorer.score(transcript, level, promptObj.requiredVocab || []);

      // Grammar
      const grammarIssues = GrammarCheck.checkAll(transcript, level);
      const grammarScore = Math.max(20, 100 - grammarIssues.length * 12);

      // Fluency proxy — word count vs expected
      const expectedMin = promptObj.timeMinutes * 60; // rough: 60 words per minute spoken
      const fluencyScore = Math.min(100, Math.round((wc / Math.max(1, expectedMin * 0.4)) * 100));

      // Discourse markers present
      const {found: markers} = VocabScorer.countMarkers(transcript, level);
      const markerScore = Math.min(100, markers.length * 20);

      // Phrase bank coverage
      let phraseScore = 50;
      if (promptObj.phraseTargets && promptObj.phraseTargets.length) {
        const found = promptObj.phraseTargets.filter(p => containsPhrase(transcript, p));
        phraseScore = Math.round((found.length / promptObj.phraseTargets.length) * 100);
      }

      const rubric = promptObj.rubric || {};
      let total = 0, weightSum = 0;
      const breakdown = {};

      const addSection = (key, score, feedbackArr) => {
        if (rubric[key]) {
          breakdown[key] = { score, weight: rubric[key].weight, feedback: feedbackArr };
          total += score * rubric[key].weight;
          weightSum += rubric[key].weight;
        }
      };

      addSection('content', content.score, content.feedback);
      addSection('vocabulary', vocab.score, vocab.feedback);
      addSection('grammar', grammarScore, grammarIssues.length ? grammarIssues : ['✓ No obvious grammar errors']);
      addSection('fluency', fluencyScore, [
        wc < 30 ? 'Try to speak more — aim for complete, detailed answers.' : `✓ Reasonable length (${wc} words transcribed)`,
        markers.length > 0 ? `✓ Good use of connectors: ${markers.slice(0,3).join(', ')}` : 'Use more connecting words'
      ]);
      addSection('interaction', phraseScore, [
        phraseScore >= 60 ? '✓ Good use of target phrases' : `Try to include: ${(promptObj.phraseTargets||[]).slice(0,2).join(', ')}`
      ]);

      const totalScore = weightSum > 0 ? Math.round(total / weightSum)
        : Math.round((content.score + vocab.score + grammarScore + fluencyScore) / 4);

      const allFeedback = [];
      const allPositive = [];
      Object.values(breakdown).forEach(b => {
        (b.feedback||[]).forEach(f => {
          if (f.startsWith('✓')) allPositive.push(f);
          else allFeedback.push(f);
        });
      });

      return {
        totalScore,
        grade: Writing._scoreToGrade(totalScore),
        breakdown,
        feedback: allFeedback.slice(0,4),
        positiveFeedback: allPositive.slice(0,3),
        wordCount: wc,
        readyForAI: promptObj.aiAssistRecommended || false,
        limitations: ['Note: automated speaking assessment checks content and vocabulary only — pronunciation and natural fluency cannot be assessed offline.']
      };
    }
  };

  // ═══════════════════════════════════════════════
  // VOCABULARY EXERCISE ASSESSOR
  // For flashcard-style vocab checks
  // ═══════════════════════════════════════════════

  const VocabExercise = {

    checkTranslation(userAnswer, vocabEntry, direction='de-en') {
      const target = direction === 'de-en' ? vocabEntry.en : vocabEntry.de;
      const given = norm(userAnswer);
      const correct = norm(target);

      if (given === correct) {
        return { correct: true, score: 100, feedback: '✓ Correct!' };
      }

      // Allow partial match for long answers (e.g. "the environment" vs "environment")
      const givenWords = given.split(/\s+/);
      const correctWords = correct.split(/\s+/);
      const keyWord = correctWords[correctWords.length - 1]; // last word often most important
      if (givenWords.includes(keyWord) && correctWords.length > 1) {
        return {
          correct: false,
          score: 70,
          feedback: `Close! Full answer: "${target}". You wrote: "${userAnswer}"`
        };
      }

      return {
        correct: false,
        score: 0,
        feedback: `✗ Correct: "${target}" | Example: ${vocabEntry.example}`
      };
    },

    checkGender(userGender, vocabEntry) {
      const correct = vocabEntry.gender;
      if (correct === '-' || correct === 'pl') {
        return { correct: true, score: 100, feedback: 'This word has no gender (or is plural).' };
      }
      const genderMap = { m: ['der','m','masculine'], f: ['die','f','feminine'], n: ['das','n','neuter'] };
      const ok = (genderMap[correct] || []).includes(norm(userGender));
      return {
        correct: ok,
        score: ok ? 100 : 0,
        feedback: ok ? '✓ Correct gender!' : `✗ The gender is "${['m','f','n'].find(g => genderMap[g].includes(norm(userGender))) ? '' : '?'}". "${vocabEntry.de}" is ${correct === 'm' ? 'der (masculine)' : correct === 'f' ? 'die (feminine)' : 'das (neuter)'}.`
      };
    }
  };

  // ═══════════════════════════════════════════════
  // FEEDBACK GENERATOR
  // Generates human-readable, encouraging feedback
  // ═══════════════════════════════════════════════

  const FeedbackGenerator = {

    // Generates level-appropriate learning tips
    levelTip(level) {
      const tips = {
        A1: [
          'Focus on memorising articles (der/die/das) with every new noun.',
          'Practise verb conjugations daily — especially sein and haben.',
          'Remember: verb always in POSITION 2 in German sentences.'
        ],
        A2: [
          'The Perfekt tense is used for past events in speech — learn your Partizip II forms.',
          'Practise two-way prepositions: wo? → dative; wohin? → accusative.',
          'Learn the most common separable verbs with their split forms.'
        ],
        B1: [
          'Subordinate clauses (weil, dass, obwohl) always send the verb to the end.',
          'Konjunktiv II (würde/wäre/hätte/könnte) is essential for polite and hypothetical speech.',
          'Use discourse markers (einerseits, außerdem, jedoch) to structure your arguments.'
        ],
        B2: [
          'Master the passive voice for formal writing.',
          'Participial constructions (der wachsende Markt) make your writing more sophisticated.',
          'Practice zu-infinitive structures: versuchen zu, wichtig sein zu.'
        ],
        C1: [
          'Nominalisierungen are key to academic German — convert verbs to nouns.',
          'Use Konjunktiv I for reported speech in academic and journalistic writing.',
          'Vary your sentence structure — mix short punchy sentences with long complex ones.'
        ]
      };
      const arr = tips[level] || tips.B1;
      return arr[Math.floor(Math.random() * arr.length)];
    },

    // Score-based encouragement
    encouragement(score) {
      if (score >= 90) return '🌟 Excellent work! You\'re really mastering this.';
      if (score >= 80) return '✅ Great job! Just a few small things to polish.';
      if (score >= 70) return '👍 Good effort! Review the feedback and try again.';
      if (score >= 60) return '💪 Keep going! You\'re making progress.';
      if (score >= 50) return '📚 Good attempt. Focus on the key feedback points.';
      return '🔄 Don\'t give up! Review the rules and try once more.';
    },

    // Generate structured feedback summary
    summary(assessment, type='writing') {
      const lines = [];
      lines.push(this.encouragement(assessment.totalScore));
      lines.push(`Score: ${assessment.totalScore}/100 (${assessment.grade || ''})`);

      if (assessment.positiveFeedback && assessment.positiveFeedback.length) {
        lines.push('');
        lines.push('What you did well:');
        assessment.positiveFeedback.forEach(f => lines.push('  ' + f));
      }

      if (assessment.feedback && assessment.feedback.length) {
        lines.push('');
        lines.push('Areas to improve:');
        assessment.feedback.forEach(f => lines.push('  • ' + f));
      }

      if (assessment.readyForAI) {
        lines.push('');
        lines.push('💡 Enable AI Assist for deeper feedback on argument quality and style.');
        if (assessment.aiReason) lines.push('   ' + assessment.aiReason);
      }

      if (type === 'speaking' && assessment.limitations) {
        lines.push('');
        assessment.limitations.forEach(l => lines.push('ℹ️  ' + l));
      }

      return lines.join('\n');
    }
  };

  // ═══════════════════════════════════════════════
  // RUBRIC CALCULATOR
  // Takes a rubric definition and section scores → final score
  // ═══════════════════════════════════════════════

  const RubricCalc = {
    calculate(rubricDef, sectionScores) {
      let total = 0;
      let weightSum = 0;
      const breakdown = {};

      Object.keys(rubricDef).forEach(key => {
        const weight = rubricDef[key].weight || 25;
        const score = sectionScores[key] || 0;
        total += score * weight;
        weightSum += weight;
        breakdown[key] = { score, weight, criteria: rubricDef[key].criteria };
      });

      return {
        totalScore: weightSum > 0 ? Math.round(total / weightSum) : 0,
        breakdown
      };
    }
  };

  // ═══════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════

  return {
    // Exercise checking
    checkExercise(type, userAnswer, correctAnswer) {
      const fn = Exercise[type];
      if (!fn) return { score: 0, correct: false, feedback: [`Unknown exercise type: ${type}`] };
      return fn.call(Exercise, userAnswer, correctAnswer);
    },

    // Full writing assessment
    assessWriting(text, promptObj) {
      return Writing.assess(text, promptObj);
    },

    // Speaking transcript assessment
    assessSpeaking(transcript, promptObj) {
      return Speaking.assess(transcript, promptObj);
    },

    // Vocabulary exercise check
    checkVocab(userAnswer, vocabEntry, direction) {
      return VocabExercise.checkTranslation(userAnswer, vocabEntry, direction);
    },
    checkGender(userGender, vocabEntry) {
      return VocabExercise.checkGender(userGender, vocabEntry);
    },

    // Grammar checks on free text
    checkGrammar(text, level) {
      return GrammarCheck.checkAll(text, level);
    },

    // Feedback generation
    generateFeedback(assessment, type) {
      return FeedbackGenerator.summary(assessment, type);
    },
    levelTip(level) {
      return FeedbackGenerator.levelTip(level);
    },
    encouragement(score) {
      return FeedbackGenerator.encouragement(score);
    },

    // Rubric calculator
    calculateRubric(rubricDef, sectionScores) {
      return RubricCalc.calculate(rubricDef, sectionScores);
    },

    // Utility
    countWords,
    containsPhrase,
    normText: norm
  };

})();

console.log('ASSESSMENT engine loaded');
