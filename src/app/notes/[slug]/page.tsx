import Link from "next/link";
import { notFound } from "next/navigation";

const ARTICLES: Record<string, { title: string; date: string; content: string }> = {
  "why-clerk-not-nextauth": {
    title: "Почему я выбрал Clerk, а не NextAuth",
    date: "2026-09-20",
    content: `
Когда я начинал делать сайт-портфолио, стоял выбор: NextAuth или Clerk.

NextAuth — бесплатный, гибкий, огромное сообщество. Но требует писать свою логику для:
— Форм входа/регистрации
— Защиты от перебора email
— CSRF, XSS
— Работы с сессиями

Clerk даёт всё это из коробки. Плюс:
— Красивые компоненты (SignIn, SignUp, UserButton)
— Защита от перебора — Clerk скрывает, зарегистрирован ли email
— Webhooks для синхронизации с БД
— Бесплатно до 10 000 MAU

Минус — зависимость от стороннего сервиса. Но для портфолио это оправдано.

**Вывод:** если нужна быстрая разработка с максимальной безопасностью — Clerk.
    `,
  },
  "500-messages-per-day": {
    title: "Как я оптимизировал бота на 500 сообщений в день",
    date: "2026-09-15",
    content: `
Бот обрабатывал 500+ сообщений в день и начал тормозить.

Что помогло:

1. **Асинхронные запросы** — заменил все sync-вызовы на async. discord.py уже асинхронный, но обращения к БД и API — нет.

2. **Кэширование** — данные юзера хранятся в памяти 5 минут. Запросы к БД сократились в 10 раз.

3. **Batch-запросы** — вместо N запросов к Discord API — один batch.

4. **JSON → SQLite** — перешёл с JSON-файла на SQLite. Чтение ускорилось в 20 раз.

**Результат:** latency с 2 секунд до 200 мс.
    `,
  },
  "dark-theme-design": {
    title: "Дизайн тёмной темы, который не раздражает",
    date: "2026-09-10",
    content: `
Тёмная тема — это не просто "инверсия цветов".

**Чистый чёрный (#000) — плохо.** Он вызывает напряжение глаз. Используйте #0a0118 или #1a1a2e.

**Контраст — важен.** Текст #ffffff на фоне #0a0118 — хорошо. Но не переборщите: слишком высокий контраст тоже утомляет.

**Цвета — приглушённые.** Ярко-красный на тёмном фоне — как лазер. Используйте более мягкие оттенки.

**Фиолетовый вместо синего.** Синий на тёмном фоне плохо читается (особенно у людей с дальтонизмом). Фиолетовый + розовый — работают.

**Анимации — короткие.** Смена темы за 0.3 сек — ок. За 1 сек — уже раздражает.
    `,
  },
  "prisma-vs-typeorm": {
    title: "Prisma vs TypeORM: что выбрать для Next.js в 2026",
    date: "2026-09-05",
    content: `
Сравнивал на реальном проекте (этот сайт).

**Prisma:**
+ Схема в одном файле — читаемо
+ Типы генерируются автоматически
+ Отличная работа с миграциями
+ Простой API
− Медленнее на сложных запросах
− Меньше гибкости

**TypeORM:**
+ Больше возможностей (декораторы, репозитории)
+ Гибче
− Сложнее настройка
− Типы не всегда точные
− Меньше документации

**Итог:** для нового проекта на Next.js — Prisma. Для enterprise с кучей legacy — TypeORM.
    `,
  },
};

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) notFound();

  return (
    <>
      <section className="page-header">
        <Link
          href="/notes"
          style={{
            color: "var(--purple-light)",
            textDecoration: "none",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            display: "inline-block",
          }}
        >
          ← Все заметки
        </Link>
        <h1 className="section-title" style={{ fontSize: "2.5rem" }}>
          {article.title}
        </h1>
        <p>{article.date}</p>
      </section>

      <section
        className="about"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 2rem 4rem",
        }}
      >
        <div
          style={{
            color: "var(--text-muted)",
            lineHeight: 1.8,
            fontSize: "1.05rem",
            whiteSpace: "pre-wrap",
          }}
        >
          {article.content}
        </div>
      </section>
    </>
  );
}