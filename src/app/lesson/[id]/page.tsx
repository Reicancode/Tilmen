"use client";

import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { useParams } from "next/navigation";
import { lessons } from "../../data/lessons";
import { completeLesson, getProgress } from "../../lib/progress";

export default function LessonPage() {
  const params = useParams();
  const id = Number(params.id);

  /* ---------------- STATE ---------------- */
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [showXp, setShowXp] = useState(false);

  /* ---------------- DATA ---------------- */
  const lesson = useMemo(
    () => lessons.find((l) => l.id === id),
    [id]
  );

  const wasCompletedBefore = useMemo(() => {
    const progress = getProgress();
    return lesson ? progress.completedLessons.includes(lesson.id) : false;
  }, [lesson]);

  /* ---------------- EFFECTS ---------------- */

  // 🔊 звук правильного ответа
  useEffect(() => {
    if (isCorrect === true) {
      const audio = new Audio("/sounds/correct.mp3");
      audio.volume = 0.6;
      audio.play().catch(() => {});
    }
  }, [isCorrect]);

  // 🟣 завершение урока
  useEffect(() => {
    if (!lesson) return;
    if (step < lesson.questions.length) return;

    const audio = new Audio("/sounds/victory.mp3");
    audio.volume = 0.7;
    audio.play().catch(() => {});

    setTimeout(() => {
      confetti({
        particleCount: 140,
        spread: 80,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.6 },
      });
    }, 100);

    if (!wasCompletedBefore) {
      setShowXp(true);
      setTimeout(() => setShowXp(false), 1600);
    }

    completeLesson(lesson.id);
  }, [step, lesson, wasCompletedBefore]);

  /* ---------------- GUARDS ---------------- */

  if (!lesson) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Урок не найден
      </main>
    );
  }

  const current = lesson.questions[step];

  /* ---------------- ACTIONS ---------------- */

  function checkAnswer() {
    if (!selected) return;

    if (selected === current.correct) {
      setIsCorrect(true);
      setWrongAnswer(null);
      setExplanation(null);
    } else {
      setIsCorrect(false);
      setWrongAnswer(selected);
    }
  }

  function nextQuestion() {
    setSelected(null);
    setIsCorrect(null);
    setWrongAnswer(null);
    setExplanation(null);
    setStep((s) => s + 1);
  }

  function retryQuestion() {
    setSelected(null);
    setIsCorrect(null);
    setWrongAnswer(null);
    setExplanation(null);
  }

  async function explainMistake() {
    if (!wrongAnswer) return;

    setLoadingExplain(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "explain",
          messages: [
            {
              role: "user",
              text: `Вопрос: ${current.question}
Правильный ответ: ${current.correct}
Ответ ученика: ${wrongAnswer}`,
            },
          ],
        }),
      });

      const data = await res.json();
      setExplanation(data.text);
    } catch {
      setExplanation("Не удалось получить объяснение 😢");
    } finally {
      setLoadingExplain(false);
    }
  }

  /* ---------------- FINISH SCREEN ---------------- */

  if (step >= lesson.questions.length) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--primary-light)]">
        {showXp && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-3xl font-extrabold text-yellow-500 animate-xp-pop">
              +20 XP
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
          <h2 className="text-xl font-bold mb-3 text-[var(--primary)]">
            🎉 Урок завершён!
          </h2>
          <a
            href="/lessons"
            className="font-semibold text-[var(--primary)] hover:underline"
          >
            К урокам
          </a>
        </div>
      </main>
    );
  }

  /* ---------------- QUESTION UI ---------------- */

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--primary-light)] px-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">
        <p className="text-sm font-semibold mb-2 text-[var(--primary)]">
          Вопрос {step + 1} из {lesson.questions.length}
        </p>

        <h2 className="font-bold mb-6 text-gray-900 text-lg">
          {current.question}
        </h2>

        <div className="space-y-3 mb-6">
          {current.options.map((option) => {
            const isSelected = selected === option;
            const isCorrectAnswer = option === current.correct;
            const showCorrect = isCorrect === false;

            return (
              <button
                key={option}
                onClick={() => setSelected(option)}
                disabled={isCorrect !== null}
                className={`w-full py-3 rounded-xl font-medium border-2 transition
                ${
                  showCorrect && isCorrectAnswer
                    ? "bg-green-50 border-green-400 text-green-900"
                    : isSelected
                    ? "border-[var(--primary)] bg-[var(--primary-light)]"
                    : "border-[var(--primary-light)] bg-white hover:border-[var(--primary)]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <button
            onClick={
              isCorrect === null
                ? checkAnswer
                : isCorrect
                ? nextQuestion
                : retryQuestion
            }
            disabled={isCorrect === null && !selected}
            className={`w-full py-3 rounded-xl font-semibold text-white transition
            ${
              isCorrect === null
                ? selected
                  ? "bg-[var(--primary)]"
                  : "bg-gray-300"
                : isCorrect
                ? "bg-[var(--primary)]"
                : "bg-red-500"
            }`}
          >
            {isCorrect === null
              ? "Проверить"
              : isCorrect
              ? "Далее"
              : "Попробовать снова"}
          </button>

          <div className="mt-3 min-h-[3rem] flex items-center justify-center">
            {isCorrect === true && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-300 text-green-700 rounded-xl px-4 py-2 font-semibold">
                ✅ Верно!
              </div>
            )}

            {isCorrect === false && (
              <button
                onClick={explainMistake}
                disabled={loadingExplain}
                className="text-sm font-semibold text-[var(--primary)] hover:underline"
              >
                🤖 Объясни ошибку
              </button>
            )}
          </div>
        </div>

        {explanation && (
          <div className="mt-4 bg-[var(--primary-light)] p-4 rounded-xl text-sm">
            {explanation}
          </div>
        )}
      </div>
    </main>
  );
}
