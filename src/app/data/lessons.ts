export type Question = {
  question: string;
  options: string[];
  correct: string;
};

export type Lesson = {
  id: number;
  title: string;
  questions: Question[];
};

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Приветствия",
    questions: [
      {
        question: "Как будет «привет» по-казахски?",
        options: ["Сау бол", "Сәлем", "Рахмет"],
        correct: "Сәлем",
      },
      {
        question: "Как будет «до свидания»?",
        options: ["Сау бол", "Иә", "Сәлем"],
        correct: "Сау бол",
      },
      {
        question: "Как поздороваться официально?",
        options: ["Сәлем", "Сәлеметсіз бе", "Қош бол"],
        correct: "Сәлеметсіз бе",
      },
      {
        question: "Что значит «Қош келдіңіз»?",
        options: ["До свидания", "Добро пожаловать", "Спасибо"],
        correct: "Добро пожаловать",
      },
      {
        question: "Как сказать «доброе утро»?",
        options: ["Қайырлы таң", "Қайырлы кеш", "Қайырлы түн"],
        correct: "Қайырлы таң",
      },
    ],
  },
  {
    id: 2,
    title: "Вежливые слова",
    questions: [
      {
        question: "Как будет «спасибо»?",
        options: ["Рахмет", "Иә", "Жоқ"],
        correct: "Рахмет",
      },
      {
        question: "Как сказать «пожалуйста»?",
        options: ["Өтінемін", "Кешіріңіз", "Рахмет"],
        correct: "Өтінемін",
      },
      {
        question: "Как будет «извините»?",
        options: ["Сау бол", "Кешіріңіз", "Қуаныштымын"],
        correct: "Кешіріңіз",
      },
      {
        question: "Что значит «Иә»?",
        options: ["Нет", "Спасибо", "Да"],
        correct: "Да",
      },
      {
        question: "Что значит «Жоқ»?",
        options: ["Да", "Нет", "Пожалуйста"],
        correct: "Нет",
      },
    ],
  },
  {
    id: 3,
    title: "Знакомство",
    questions: [
      {
        question: "Как спросить «Как тебя зовут?»?",
        options: ["Қалайсың?", "Атың кім?", "Қайдасың?"],
        correct: "Атың кім?",
      },
      {
        question: "Как ответить «Меня зовут Алия»?",
        options: ["Мен Алия", "Атым Алия", "Менде Алия"],
        correct: "Атым Алия",
      },
      {
        question: "Как спросить «Как дела?»?",
        options: ["Қайда барасың?", "Қалайсың?", "Не істейсің?"],
        correct: "Қалайсың?",
      },
      {
        question: "Что значит «Жақсы»?",
        options: ["Плохо", "Хорошо", "Нормально"],
        correct: "Хорошо",
      },
      {
        question: "Как будет «Я рад»?",
        options: ["Мен шаршадым", "Мен қуаныштымын", "Мен ашпын"],
        correct: "Мен қуаныштымын",
      },
    ],
  },
  {
    id: 4,
    title: "Числа 1–5",
    questions: [
      {
        question: "Как будет «один»?",
        options: ["Бір", "Екі", "Үш"],
        correct: "Бір",
      },
      {
        question: "Как будет «два»?",
        options: ["Төрт", "Екі", "Бес"],
        correct: "Екі",
      },
      {
        question: "Как будет «три»?",
        options: ["Үш", "Бір", "Алты"],
        correct: "Үш",
      },
      {
        question: "Как будет «четыре»?",
        options: ["Бес", "Төрт", "Екі"],
        correct: "Төрт",
      },
      {
        question: "Как будет «пять»?",
        options: ["Алты", "Бес", "Жеті"],
        correct: "Бес",
      },
    ],
  },
  {
    id: 5,
    title: "Семья",
    questions: [
      {
        question: "Как будет «мама»?",
        options: ["Әке", "Ана", "Аға"],
        correct: "Ана",
      },
      {
        question: "Как будет «папа»?",
        options: ["Ана", "Әке", "Іні"],
        correct: "Әке",
      },
      {
        question: "Как будет «брат (старший)»?",
        options: ["Іні", "Аға", "Әпке"],
        correct: "Аға",
      },
      {
        question: "Как будет «сестра (старшая)»?",
        options: ["Қарындас", "Әпке", "Ана"],
        correct: "Әпке",
      },
      {
        question: "Что значит «Отбасы»?",
        options: ["Дом", "Семья", "Родственник"],
        correct: "Семья",
      },
    ],
  },
  {
    id: 6,
    title: "Еда",
    questions: [
      {
        question: "Как будет «еда»?",
        options: ["Су", "Тамақ", "Ас"],
        correct: "Ас",
      },
      {
        question: "Как будет «вода»?",
        options: ["Шай", "Су", "Сүт"],
        correct: "Су",
      },
      {
        question: "Как будет «чай»?",
        options: ["Шай", "Кофе", "Су"],
        correct: "Шай",
      },
      {
        question: "Как будет «хлеб»?",
        options: ["Нан", "Ет", "Сүт"],
        correct: "Нан",
      },
      {
        question: "Как будет «мясо»?",
        options: ["Сүт", "Ет", "Ас"],
        correct: "Ет",
      },
    ],
  },
  {
    id: 7,
    title: "Цвета",
    questions: [
      {
        question: "Как будет «белый»?",
        options: ["Қара", "Ақ", "Қызыл"],
        correct: "Ақ",
      },
      {
        question: "Как будет «черный»?",
        options: ["Ақ", "Көк", "Қара"],
        correct: "Қара",
      },
      {
        question: "Как будет «красный»?",
        options: ["Жасыл", "Сары", "Қызыл"],
        correct: "Қызыл",
      },
      {
        question: "Как будет «синий»?",
        options: ["Көк", "Ақ", "Қоңыр"],
        correct: "Көк",
      },
      {
        question: "Как будет «зеленый»?",
        options: ["Сары", "Жасыл", "Көк"],
        correct: "Жасыл",
      },
    ],
  },
  {
    id: 8,
    title: "Местоимения",
    questions: [
      {
        question: "Как будет «я»?",
        options: ["Сен", "Мен", "Ол"],
        correct: "Мен",
      },
      {
        question: "Как будет «ты»?",
        options: ["Ол", "Мен", "Сен"],
        correct: "Сен",
      },
      {
        question: "Как будет «он / она»?",
        options: ["Біз", "Сен", "Ол"],
        correct: "Ол",
      },
      {
        question: "Как будет «мы»?",
        options: ["Олар", "Біз", "Сендер"],
        correct: "Біз",
      },
      {
        question: "Как будет «они»?",
        options: ["Біз", "Ол", "Олар"],
        correct: "Олар",
      },
    ],
  },
  {
    id: 9,
    title: "Глаголы",
    questions: [
      {
        question: "Как будет «идти»?",
        options: ["Бар", "Кел", "Же"],
        correct: "Бар",
      },
      {
        question: "Как будет «приходить»?",
        options: ["Бар", "Кел", "Оқы"],
        correct: "Кел",
      },
      {
        question: "Как будет «есть»?",
        options: ["Іш", "Же", "Бар"],
        correct: "Же",
      },
      {
        question: "Как будет «пить»?",
        options: ["Же", "Іш", "Кел"],
        correct: "Іш",
      },
      {
        question: "Как будет «учиться»?",
        options: ["Оқы", "Жаз", "Бар"],
        correct: "Оқы",
      },
    ],
  },
  {
    id: 10,
    title: "Время",
    questions: [
      {
        question: "Как будет «сегодня»?",
        options: ["Ертең", "Бүгін", "Кеше"],
        correct: "Бүгін",
      },
      {
        question: "Как будет «завтра»?",
        options: ["Кеше", "Бүгін", "Ертең"],
        correct: "Ертең",
      },
      {
        question: "Как будет «вчера»?",
        options: ["Ертең", "Кеше", "Бүгін"],
        correct: "Кеше",
      },
      {
        question: "Как будет «утро»?",
        options: ["Кеш", "Таң", "Түн"],
        correct: "Таң",
      },
      {
        question: "Как будет «ночь»?",
        options: ["Түн", "Күн", "Таң"],
        correct: "Түн",
      },
    ],
  },
];
