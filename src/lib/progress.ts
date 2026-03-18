export interface CompletionRecord {
  scenarioId: string;
  completedAt: string;
  bestTime: number; // seconds
  stars?: number; // 1-3
  bestCommands?: number;
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

export function markCompleted(scenarioId: string, time: number, stars?: number, commands?: number) {
  const all = loadAll();
  const existing = all[scenarioId];
  const newStars = stars || existing?.stars || 1;
  const bestStars = Math.max(newStars, existing?.stars || 0);
  const bestTime = (!existing || time < existing.bestTime) ? time : existing.bestTime;
  const bestCommands = commands !== undefined
    ? Math.min(commands, existing?.bestCommands || Infinity)
    : existing?.bestCommands;

  all[scenarioId] = {
    scenarioId,
    completedAt: new Date().toISOString(),
    bestTime,
    stars: bestStars,
    bestCommands: bestCommands === Infinity ? undefined : bestCommands,
  };
  saveAll(all);
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
