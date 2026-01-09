const KEY = "kazlingo-progress";

export type Progress = {
  completedLessons: number[];
  xp: number;
  level: number;

  streak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
};

const DEFAULT_PROGRESS: Progress = {
  completedLessons: [],
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
};

export function getProgress(): Progress {
  if (typeof window === "undefined") {
    return DEFAULT_PROGRESS;
  }

  const raw = localStorage.getItem(KEY);
  if (!raw) return DEFAULT_PROGRESS;

  try {
    const parsed = JSON.parse(raw);

    return {
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      level: typeof parsed.level === "number" ? parsed.level : 1,
      streak: typeof parsed.streak === "number" ? parsed.streak : 0,
      lastActiveDate:
        typeof parsed.lastActiveDate === "string"
          ? parsed.lastActiveDate
          : null,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem(KEY, JSON.stringify(progress));
}

export function completeLesson(id: number) {
  const progress = getProgress();
  const today = getToday();

  // ⭐ защита от повторного фарма
  const isNewLesson = !progress.completedLessons.includes(id);

  if (isNewLesson) {
    progress.completedLessons.push(id);
    progress.xp += 20;
    progress.level = Math.floor(progress.xp / 100) + 1;
  }

  // 🔥 STREAK ЛОГИКА
  if (progress.lastActiveDate !== today) {
    if (progress.lastActiveDate) {
      const last = new Date(progress.lastActiveDate);
      const now = new Date(today);
      const diff = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        progress.streak += 1; // 🔥 продолжаем
      } else if (diff > 1) {
        progress.streak = 1; // ❌ сброс
      }
    } else {
      progress.streak = 1; // первый день
    }

    progress.lastActiveDate = today;
  }

  saveProgress(progress);
}

export function isLessonUnlocked(id: number): boolean {
  const { completedLessons } = getProgress();
  if (id === 1) return true;
  return completedLessons.includes(id - 1);
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function isActiveToday(): boolean {
  const progress = getProgress();
  const today = new Date().toISOString().split("T")[0];
  return progress.lastActiveDate === today;
}
