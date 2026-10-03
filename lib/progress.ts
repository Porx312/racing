const STORAGE_KEY = "apex-school-progress";
export const PROGRESS_EVENT = "apex-school-progress";

export type ProgressState = {
  completed: string[];
};

let cachedCompleted: string[] = [];
let cacheReady = false;

function lessonKey(part: string, slug: string): string {
  return `${part}/${slug}`;
}

function readProgress(): ProgressState {
  if (typeof window === "undefined") {
    return { completed: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { completed: [] };
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !Array.isArray((parsed as ProgressState).completed)
    ) {
      return { completed: [] };
    }
    return {
      completed: (parsed as ProgressState).completed.filter(
        (item): item is string => typeof item === "string",
      ),
    };
  } catch {
    return { completed: [] };
  }
}

function writeProgress(state: ProgressState): void {
  cachedCompleted = state.completed;
  cacheReady = true;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function getCompletedLessons(): string[] {
  if (typeof window === "undefined") {
    return cachedCompleted;
  }
  if (!cacheReady) {
    cachedCompleted = readProgress().completed;
    cacheReady = true;
  }
  return cachedCompleted;
}

export function isLessonCompleted(part: string, slug: string): boolean {
  return getCompletedLessons().includes(lessonKey(part, slug));
}

export function markLessonCompleted(part: string, slug: string): string[] {
  const completed = getCompletedLessons();
  const key = lessonKey(part, slug);
  if (!completed.includes(key)) {
    writeProgress({ completed: [...completed, key] });
  }
  return getCompletedLessons();
}

export function toggleLessonCompleted(part: string, slug: string): string[] {
  const completed = getCompletedLessons();
  const key = lessonKey(part, slug);
  if (completed.includes(key)) {
    writeProgress({ completed: completed.filter((item) => item !== key) });
  } else {
    writeProgress({ completed: [...completed, key] });
  }
  return getCompletedLessons();
}

export { lessonKey };
