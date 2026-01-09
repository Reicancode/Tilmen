import { isActiveToday } from "./progress";

const REMINDER_KEY = "kazlingo-last-reminder";

let pending = false;

export function prepareStreakReminder() {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  if (isActiveToday()) return;

  const today = new Date().toISOString().split("T")[0];
  if (localStorage.getItem(REMINDER_KEY) === today) return;

  pending = true;
}

export function fireStreakReminder() {
  if (!pending) return;

  new Notification("🔥 Не потеряй streak!", {
    body: "Пройди хотя бы один урок сегодня.",
  });

  localStorage.setItem(
    REMINDER_KEY,
    new Date().toISOString().split("T")[0]
  );

  pending = false;
}
