"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "dialog" | "translate" | "explain";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AiPage() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function resetChat() {
    setMode(null);
    setMessages([]);
    setInput("");
    setLoading(false);
  }

  async function sendMessage() {
    if (!input.trim() || loading || !mode) return;

    // 🔒 режим переводчика — без вопросов
    if (mode === "translate" && input.includes("?")) return;

    const userText = input;
    setInput("");

    const newMessages: Message[] = [
      ...messages,
      { role: "user", text: userText },
    ];

    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          messages: newMessages,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { role: "ai", text: data.text }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Ошибка 😢" }]);
    } finally {
      setLoading(false);
    }
  }

  /* ------------------ MODE SELECTION ------------------ */
  if (!mode) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--primary-light)] px-4 pb-20">
        <h1 className="text-xl font-bold mb-6 text-[var(--primary)]">
          Что ты хочешь сделать?
        </h1>

        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => setMode("dialog")}
            className="w-full py-4 rounded-2xl bg-white shadow font-semibold
                       hover:scale-[1.02] transition"
          >
            💬 Диалог
          </button>

          <button
            onClick={() => setMode("translate")}
            className="w-full py-4 rounded-2xl bg-white shadow font-semibold
                       hover:scale-[1.02] transition"
          >
            🌍 Переводчик
          </button>

          <button
            onClick={() => setMode("explain")}
            className="w-full py-4 rounded-2xl bg-white shadow font-semibold
                       hover:scale-[1.02] transition"
          >
            📘 Ответы на вопросы
          </button>
        </div>
      </main>
    );
  }

  /* ------------------ CHAT ------------------ */
  return (
    <main className="min-h-screen bg-[var(--primary-light)] px-4 pt-4 pb-24">
      {/* КЛИКАБЕЛЬНЫЙ РЕЖИМ */}
      <button
        onClick={resetChat}
        className="mx-auto mb-3 block text-sm font-semibold
                   text-[var(--primary)] hover:underline"
      >
        Режим:{" "}
        {mode === "dialog"
          ? "Диалог 💬"
          : mode === "translate"
          ? "Переводчик 🌍"
          : "Ответы на вопросы 📘"}
      </button>

      <div className="space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm
              ${
                msg.role === "user"
                  ? "ml-auto bg-[var(--primary)] text-white"
                  : "mr-auto bg-white text-gray-900 shadow"
              }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-white px-4 py-3 rounded-2xl text-sm text-gray-500 shadow">
            AgAi печатает…
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="fixed bottom-16 left-0 right-0 px-4">
        <div className="flex gap-2 bg-white p-2 rounded-2xl shadow">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "translate"
                ? "Введите слово или фразу для перевода"
                : mode === "explain"
                ? "Спроси про слово или фразу"
                : "Напиши сообщение…"
            }
            className="flex-1 px-3 py-2 rounded-xl border border-gray-300
                       focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button
            onClick={sendMessage}
            className={`px-4 py-2 rounded-xl font-semibold text-white
              ${
                mode === "translate"
                  ? "bg-green-600"
                  : mode === "explain"
                  ? "bg-blue-600"
                  : "bg-[var(--primary)]"
              }`}
          >
            {mode === "translate"
              ? "Перевести"
              : mode === "explain"
              ? "Спросить"
              : "▶"}
          </button>
        </div>
      </div>
    </main>
  );
}
