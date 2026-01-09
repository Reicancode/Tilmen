export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <h1 className="text-4xl font-extrabold mb-4 text-[var(--primary)]">
        TilMen 🇰🇿
      </h1>

      <p className="text-center mb-8 max-w-md text-gray-900">
        Изучай казахский язык через простые и понятные уроки.
      </p>

      <a
        href="/lessons"
        className="bg-[var(--primary)] text-white px-8 py-3 rounded-full
                   font-semibold hover:bg-[var(--primary-dark)] transition"
      >
        Начать обучение
      </a>
    </main>
  );
}
