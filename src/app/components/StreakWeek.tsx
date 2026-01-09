"use client";

type Props = {
  streak: number;
};

export default function StreakWeek({ streak }: Props) {
  const activeDays = streak % 7 === 0 && streak !== 0 ? 7 : streak % 7;

  return (
    <div className="flex items-center gap-3">
      {/* 🔥 Огоньки */}
      <div className="flex gap-1">
        {Array.from({ length: 7 }).map((_, i) => {
          const active = i < activeDays;

          return (
            <div
              key={i}
              className={`w-5 h-5 rounded-full
    ${active ? "bg-orange-500 animate-pulse-glow" : "bg-gray-300"}
  `}
            />
          );
        })}
      </div>

      {/* 📅 Текст */}
      <div className="text-sm font-semibold text-orange-600">
        🔥 {streak}
        <span className="inline sm:hidden"> дн.</span>
        <span className="hidden sm:inline"> дней подряд</span>
      </div>
    </div>
  );
}
