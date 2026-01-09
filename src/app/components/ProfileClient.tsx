"use client";

import { useState } from "react";
import { getProfile, updateProfile } from "../lib/profile";
import { getProgress } from "../lib/progress";
import StreakWeek from "./StreakWeek";

const AVATARS = ["🧑‍🎓", "🧠", "🔥", "🇰🇿", "🐺", "🦅"];

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}

export default function ProfileClient() {
  // ✅ читаем localStorage ТОЛЬКО на клиенте
  const [profile, setProfile] = useState(() => getProfile());
  const [progress] = useState(() => getProgress());

  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState(profile.nickname);

  function save() {
    updateProfile({ nickname });
    const updated = getProfile();
    setProfile(updated);
    setNickname(updated.nickname);
    setEditing(false);
  }

  return (
    <main className="min-h-screen bg-[var(--primary-light)] px-4 py-8 pb-24 sm:pb-8">
      <h1 className="text-center text-xl font-bold text-[var(--primary)] mb-8">
        Профиль
      </h1>

      {/* 👤 Аватар + имя */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="text-6xl">{profile.avatar}</div>

        {editing ? (
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border rounded-xl px-3 py-2 text-center"
          />
        ) : (
          <div className="text-lg font-semibold">{profile.nickname}</div>
        )}

        {editing ? (
          <button
            onClick={save}
            className="text-sm text-[var(--primary)] font-semibold"
          >
            Сохранить
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-gray-500"
          >
            ✏️ Изменить
          </button>
        )}
      </div>

      {/* 🔥 Стрик */}
      <div className="bg-white rounded-2xl p-4 shadow mb-6">
        <StreakWeek streak={progress.streak} />
      </div>

      {/* 📊 Статистика */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Stat label="XP" value={progress.xp} />
        <Stat label="Уровень" value={progress.level} />
        <Stat label="Дней подряд" value={progress.streak} />
        <Stat label="Уроков" value={progress.completedLessons.length} />
      </div>

      {/* 😀 Выбор аватара */}
      <div className="bg-white rounded-2xl p-4 shadow">
        <div className="font-semibold mb-3">Аватар</div>
        <div className="flex gap-2 flex-wrap">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => {
                updateProfile({ avatar: a });
                setProfile(getProfile());
              }}
              className={`text-3xl p-2 rounded-xl ${
                profile.avatar === a
                  ? "bg-[var(--primary-light)]"
                  : "hover:bg-gray-100"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
