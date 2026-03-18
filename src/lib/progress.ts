export interface CompletionRecord {
  scenarioId: string;
  completedAt: string;
  bestTime: number; // seconds
}

const STORAGE_KEY = 'git-trainer-progress';

function loadAll(): Record<string, CompletionRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data: Record<string, CompletionRecord>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function markCompleted(scenarioId: string, time: number) {
  const all = loadAll();
  const existing = all[scenarioId];
  if (!existing || time < existing.bestTime) {
    all[scenarioId] = { scenarioId, completedAt: new Date().toISOString(), bestTime: time };
    saveAll(all);
  }
}

export function getCompletion(scenarioId: string): CompletionRecord | null {
  return loadAll()[scenarioId] || null;
}

export function getAllCompletions(): Record<string, CompletionRecord> {
  return loadAll();
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
