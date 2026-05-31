// DeutschLern — Storage Module
// localStorage-first persistence + optional GitHub Gist sync

window.STORAGE = (() => {

  const PREFIX = 'dl_';
  const KEYS = {
    progress:   PREFIX + 'progress',
    settings:   PREFIX + 'settings',
    vocab:      PREFIX + 'vocab_srs',
    sessions:   PREFIX + 'sessions',
    streak:     PREFIX + 'streak',
    xp:         PREFIX + 'xp',
    completed:  PREFIX + 'completed'
  };

  // ─── Core localStorage helpers ───────────────

  function save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch(e) {
      console.warn('Storage write failed:', e);
      return false;
    }
  }

  function load(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch(e) {
      return fallback;
    }
  }

  function remove(key) {
    try { localStorage.removeItem(key); } catch(e) {}
  }

  // ─── Settings ────────────────────────────────

  const defaultSettings = {
    apiKey: '',
    currentLevel: 'A1',
    theme: 'auto', // 'light'|'dark'|'auto'
    aiAssist: false,
    gistId: '',
    gistToken: '',
    lastSync: null,
    sessionMaxMins: 20,
    dailyGoalXP: 50
  };

  function getSettings() {
    return { ...defaultSettings, ...load(KEYS.settings, {}) };
  }

  function saveSettings(patch) {
    const current = getSettings();
    const updated = { ...current, ...patch };
    save(KEYS.settings, updated);
    return updated;
  }

  // ─── Progress tracking ───────────────────────
  // Structure: { [level]: { [topic]: { state, score, attempts, lastPracticed } } }

  function getProgress() {
    return load(KEYS.progress, {});
  }

  function setTopicState(level, topic, state) {
    // state: 'not-started' | 'learning' | 'mastered'
    const progress = getProgress();
    if (!progress[level]) progress[level] = {};
    progress[level][topic] = {
      ...progress[level][topic],
      state,
      lastUpdated: Date.now()
    };
    save(KEYS.progress, progress);
    return progress;
  }

  function updateTopicScore(level, topic, score) {
    const progress = getProgress();
    if (!progress[level]) progress[level] = {};
    const existing = progress[level][topic] || { state:'not-started', attempts:0, scores:[] };
    existing.attempts = (existing.attempts || 0) + 1;
    existing.scores = [...(existing.scores||[]).slice(-9), score]; // keep last 10
    existing.lastScore = score;
    existing.lastPracticed = Date.now();

    // Auto-advance state
    const recentScores = existing.scores.slice(-2);
    if (recentScores.length >= 2 && recentScores.every(s => s >= 80)) {
      existing.state = 'mastered';
    } else if (existing.attempts >= 1 && existing.state === 'not-started') {
      existing.state = 'learning';
    }

    progress[level][topic] = existing;
    save(KEYS.progress, progress);
    return existing;
  }

  function getTopicState(level, topic) {
    const p = getProgress();
    return (p[level] && p[level][topic]) ? p[level][topic].state : 'not-started';
  }

  // ─── XP & Streaks ────────────────────────────

  function getXP() {
    return load(KEYS.xp, { total: 0, today: 0, todayDate: '' });
  }

  function addXP(amount) {
    const xp = getXP();
    const today = new Date().toDateString();
    if (xp.todayDate !== today) {
      xp.today = 0;
      xp.todayDate = today;
    }
    xp.total = (xp.total || 0) + amount;
    xp.today = (xp.today || 0) + amount;
    save(KEYS.xp, xp);
    _updateStreak();
    return xp;
  }

  function _updateStreak() {
    const streak = load(KEYS.streak, { count: 0, lastDate: '' });
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (streak.lastDate === today) return streak;
    if (streak.lastDate === yesterday) {
      streak.count = (streak.count || 0) + 1;
    } else {
      streak.count = 1;
    }
    streak.lastDate = today;
    save(KEYS.streak, streak);
    return streak;
  }

  function getStreak() {
    return load(KEYS.streak, { count: 0, lastDate: '' });
  }

  // ─── Completed exercises (no-repeat) ─────────

  function getCompleted() {
    return load(KEYS.completed, {});
  }

  function markCompleted(type, id) {
    const completed = getCompleted();
    if (!completed[type]) completed[type] = [];
    if (!completed[type].includes(id)) completed[type].push(id);
    save(KEYS.completed, completed);
  }

  function isCompleted(type, id) {
    const c = getCompleted();
    return c[type] && c[type].includes(id);
  }

  function resetCompleted(type) {
    const completed = getCompleted();
    if (type) { completed[type] = []; }
    else { Object.keys(completed).forEach(k => { completed[k] = []; }); }
    save(KEYS.completed, completed);
  }

  // ─── Session history ──────────────────────────

  function logSession(sessionData) {
    const sessions = load(KEYS.sessions, []);
    sessions.push({ ...sessionData, timestamp: Date.now() });
    // Keep last 30 sessions
    save(KEYS.sessions, sessions.slice(-30));
  }

  function getSessions() {
    return load(KEYS.sessions, []);
  }

  // ─── Export / Import ─────────────────────────

  function exportData() {
    const data = {
      version: 1,
      exported: new Date().toISOString(),
      progress: getProgress(),
      xp: getXP(),
      streak: getStreak(),
      vocab: load(KEYS.vocab, {}),
      completed: getCompleted(),
      sessions: getSessions()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deutschlern-progress.json';
    a.click();
    URL.revokeObjectURL(url);
    return data;
  }

  function importData(jsonText) {
    try {
      const data = JSON.parse(jsonText);
      if (!data.version || !data.progress) throw new Error('Invalid format');
      if (data.progress) save(KEYS.progress, data.progress);
      if (data.xp) save(KEYS.xp, data.xp);
      if (data.streak) save(KEYS.streak, data.streak);
      if (data.vocab) save(KEYS.vocab, data.vocab);
      if (data.completed) save(KEYS.completed, data.completed);
      if (data.sessions) save(KEYS.sessions, data.sessions);
      return { success: true, message: 'Progress imported successfully!' };
    } catch(e) {
      return { success: false, message: 'Import failed: ' + e.message };
    }
  }

  // ─── GitHub Gist sync ────────────────────────

  async function syncToGist() {
    const settings = getSettings();
    if (!settings.gistToken) {
      return { success: false, message: 'No GitHub token set in Settings.' };
    }

    const data = {
      progress: getProgress(),
      xp: getXP(),
      streak: getStreak(),
      vocab: load(KEYS.vocab, {}),
      completed: getCompleted()
    };

    const content = JSON.stringify(data, null, 2);
    const filename = 'deutschlern-sync.json';

    try {
      let url = 'https://api.github.com/gists';
      let method = 'POST';
      let body = {
        description: 'DeutschLern progress sync',
        public: false,
        files: { [filename]: { content } }
      };

      if (settings.gistId) {
        url = `https://api.github.com/gists/${settings.gistId}`;
        method = 'PATCH';
        body = { files: { [filename]: { content } } };
      }

      const resp = await fetch(url, {
        method,
        headers: {
          'Authorization': `token ${settings.gistToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!resp.ok) throw new Error(`GitHub API error: ${resp.status}`);
      const json = await resp.json();
      saveSettings({ gistId: json.id, lastSync: new Date().toISOString() });
      return { success: true, message: 'Synced to GitHub Gist ✓', gistId: json.id };
    } catch(e) {
      return { success: false, message: 'Sync failed: ' + e.message };
    }
  }

  async function syncFromGist() {
    const settings = getSettings();
    if (!settings.gistToken || !settings.gistId) {
      return { success: false, message: 'No Gist ID or token in Settings.' };
    }
    try {
      const resp = await fetch(`https://api.github.com/gists/${settings.gistId}`, {
        headers: { 'Authorization': `token ${settings.gistToken}` }
      });
      if (!resp.ok) throw new Error(`GitHub API error: ${resp.status}`);
      const json = await resp.json();
      const file = json.files['deutschlern-sync.json'];
      if (!file) throw new Error('No sync file found in Gist');
      return importData(file.content);
    } catch(e) {
      return { success: false, message: 'Sync failed: ' + e.message };
    }
  }

  // ─── Clear all data ───────────────────────────

  function clearAll() {
    Object.values(KEYS).forEach(k => remove(k));
  }

  // Public API
  return {
    getSettings, saveSettings,
    getProgress, setTopicState, updateTopicScore, getTopicState,
    getXP, addXP,
    getStreak,
    getCompleted, markCompleted, isCompleted, resetCompleted,
    logSession, getSessions,
    exportData, importData,
    syncToGist, syncFromGist,
    clearAll,
    // Low-level (for progress.js)
    _save: save, _load: load, _keys: KEYS
  };
})();

console.log('STORAGE loaded');
