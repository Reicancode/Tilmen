"use client";

import Link from "next/link";
import { useState } from "react";
import { lessons } from "../data/lessons";
import { getProgress, isActiveToday } from "../lib/progress";
import { getProfile } from "../lib/profile";
import StreakWeek from "./StreakWeek";

/* ---------- MINI STAT ---------- */
function StatMini({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="bg-white px-3 py-2 rounded-xl shadow text-sm font-semibold flex items-center gap-1">
      <span>{icon}</span>
      <span>{value}</span>
      <span className="hidden sm:inline text-gray-500">{label}</span>
    </div>
  );
}

export default function LessonsClient() {
  // ✅ ИНИЦИАЛИЗАЦИЯ СРАЗУ
  const [progress] = useState(() => getProgress());
  const [profile] = useState(() => getProfile());
  const [showBanner, setShowBanner] = useState(() => !isActiveToday());

  // ⏱️ ТОЛЬКО таймер — разрешено
  if (showBanner) {
    setTimeout(() => setShowBanner(false), 3500);
  }

  return (
    <main className="min-h-screen bg-[var(--primary-light)] px-4 py-8 pb-24 sm:pb-8">
      {/* 🔔 БАННЕР */}
      {showBanner && (
        <div className="fixed z-50 left-1/2 -translate-x-1/2 top-6 max-w-[90vw] sm:max-w-md bg-orange-500 text-white px-5 py-3 rounded-2xl shadow-xl text-center animate-banner-in-out">
          🔥 Не потеряй streak — пройди урок сегодня!
        </div>
      )}

      {/* 👤 ПРОФИЛЬ */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/profile"
          className="bg-white rounded-2xl shadow px-4 py-3 flex items-center gap-4 hover:shadow-lg transition"
        >
          <div className="text-3xl">{profile.avatar}</div>

          <div className="flex-1">
            <div className="font-medium">{profile.nickname}</div>

            <div className="flex gap-2 mt-2 flex-wrap">
              <StatMini label="XP" value={progress.xp} icon="⭐" />
              <StatMini label="Уровень" value={progress.level} icon="🆙" />
              <div className="bg-[var(--primary-light)] px-3 py-2 rounded-xl text-sm font-semibold">
                <StreakWeek streak={progress.streak} />
              </div>
            </div>
          </div>
        </Link>
      </div>

      <h1 className="text-center text-xl font-bold text-[var(--primary)] mb-10">
        Путь изучения 🇰🇿
      </h1>

      {/* 🛤 УРОКИ */}
      <div className="relative flex flex-col items-center gap-14">
        <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-sky-300 via-sky-200 to-transparent rounded-full" />

        {lessons.map((lesson, index) => {
          const completed = progress.completedLessons.includes(lesson.id);
          const unlocked =
            lesson.id === 1 ||
            progress.completedLessons.includes(lesson.id - 1);

          const offset =
            index % 2 === 0
              ? "-translate-x-24 sm:-translate-x-32"
              : "translate-x-24 sm:translate-x-32";

          return (
            <div key={lesson.id} className={`relative ${offset}`}>
              {unlocked ? (
                <Link href={`/lesson/${lesson.id}`}>
                  <div
                    className={`w-20 h-20 rounded-full
    flex flex-col items-center justify-center
    text-white font-bold text-center
    leading-none
    shadow-xl transition hover:scale-110
    ${
      completed
        ? "bg-gradient-to-br from-yellow-400 to-amber-500"
        : "bg-gradient-to-br from-sky-400 to-cyan-500"
    }`}
                  >
                    <div className="text-lg">{completed ? "✓" : lesson.id}</div>

                    <div className="text-[10px] font-medium mt-1 px-1">
                      {lesson.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                  🔒
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
