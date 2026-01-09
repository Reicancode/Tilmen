import { NextResponse } from "next/server";
import { phraseDictionary, wordDictionary } from "../../data/dictionary";

/* ---------------- TYPES ---------------- */

type Mode = "dialog" | "translate" | "explain";

type ClientMessage = {
  role: "user" | "ai";
  text: string;
};

type OpenAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type RequestBody = {
  mode: Mode;
  messages: ClientMessage[];
};

/* ---------------- UTILS ---------------- */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-zа-яёәіңғүұқөһ]/gi, "")
    .trim();
}

/* ---------------- HANDLER ---------------- */

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const { mode, messages } = body;

    if (!mode || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { text: "Некорректный запрос" },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];

    /* 🔑 ЛОКАЛЬНЫЙ СЛОВАРЬ (translate) */
    if (mode === "translate") {
      const key = normalize(lastMessage.text);

      if (phraseDictionary[key]) {
        return NextResponse.json({ text: phraseDictionary[key] });
      }

      if (wordDictionary[key]) {
        return NextResponse.json({ text: wordDictionary[key] });
      }
    }

    const systemPrompt = getSystemPrompt(mode);

    const chatMessages: OpenAIMessage[] =
      mode === "translate"
        ? [
            {
              role: "system",
              content:
                "Ты автоматический переводчик. Всегда переводи текст с русского или английского на казахский. Если не знаешь — верни исходный текст.",
            },
            {
              role: "user",
              content: lastMessage.text,
            },
          ]
        : [
            { role: "system", content: systemPrompt },
            ...messages.map<OpenAIMessage>((m) => ({
              role: m.role === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ];

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: chatMessages,
          temperature: 0.3,
          max_tokens: 200,
        }),
      }
    );

    const data: {
      choices?: { message?: { content?: string } }[];
    } = await response.json();

    const text =
      data.choices?.[0]?.message?.content?.trim() ??
      lastMessage.text;

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI ERROR:", error);
    return NextResponse.json(
      { text: "Ошибка сервера 😢" },
      { status: 500 }
    );
  }
}

/* ---------------- PROMPTS ---------------- */

function getSystemPrompt(mode: Mode): string {
  switch (mode) {
    case "dialog":
      return `
Ты — собеседник для практики казахского языка.

ПРАВИЛА:
- Отвечай ТОЛЬКО на казахском языке.
- Понимай русский язык, но НЕ отвечай на нём.
- Не объясняй.
- Не переводить.
- Не исправляй ошибки.
- Если не понял — задай уточняющий вопрос на казахском.
- Говори коротко и естественно.
`;

    case "translate":
      return `
Ты — автоматический переводчик.

ПРАВИЛА:
- Всегда возвращай перевод.
- Без объяснений.
- Без форматирования.
- Если не знаешь — верни исходный текст.
`;

    case "explain":
      return `
Ты — преподаватель казахского языка.

ПРАВИЛА:
- Отвечай на языке пользователя.
- Казахский используй только в примерах.
- Коротко и понятно.
- 1–2 примера.
`;

    default:
      return "Ты полезный ассистент.";
  }
}
