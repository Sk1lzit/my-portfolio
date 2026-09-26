import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Заметки — Sk1lz",
  description: "Статьи о разработке ботов, сайтов и автоматизации",
};

const NOTES = [
  {
    slug: "why-clerk-not-nextauth",
    title: "Почему я выбрал Clerk, а не NextAuth",
    excerpt:
      "NextAuth требует больше кода и настройки. Clerk даёт готовые формы, защиту от CSRF, XSS и перебора email из коробки.",
    date: "2026-09-20",
    tags: ["Next.js", "Auth", "Clerk"],
  },
  {
    slug: "500-messages-per-day",
    title: "Как я оптимизировал бота на 500 сообщений в день",
    excerpt:
      "Разбираю, как кэширование, batch-запросы в Discord API и асинхронность на discord.py помогли поднять производительность.",
    date: "2026-09-15",
    tags: ["Python", "discord.py", "Async"],
  },
  {
    slug: "dark-theme-design",
    title: "Дизайн тёмной темы, который не раздражает",
    excerpt:
      "Почему важен контраст, как избежать чистого чёрного цвета и почему фиолетовый работает лучше синего.",
    date: "2026-09-10",
    tags: ["UI/UX", "CSS", "Design"],
  },
  {
    slug: "prisma-vs-typeorm",
    title: "Prisma vs TypeORM: что выбрать для Next.js в 2026",
    excerpt:
      "Сравниваю на реальном проекте: скорость разработки, типобезопасность, миграции и работа со сложными связями.",
    date: "2026-09-05",
    tags: ["Prisma", "TypeORM", "Next.js"],
  },
];

export default function Notes() {
  return (
    <>
      <section className="page-header">
        <h1 className="section-title">Заметки</h1>
        <p>Короткие статьи о разработке — боты, сайты, автоматизация</p>
      </section>

      <section className="projects" style={{ maxWidth: "900px" }}>
        {NOTES.map((note, index) => (
          <FadeIn key={note.slug} delay={index * 100}>
            <Link
              href={`/notes/${note.slug}`}
              className="project-card"
              style={{
                display: "block",
                padding: "2rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginBottom: "1rem",
                }}
              >
                <h2
                  style={{
                    color: "var(--purple-light)",
                    fontSize: "1.5rem",
                    margin: 0,
                  }}
                >
                  {note.title}
                </h2>
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {note.date}
                </span>
              </div>

              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  marginBottom: "1rem",
                }}
              >
                {note.excerpt}
              </p>

              <div className="project-tags">
                {note.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </FadeIn>
        ))}
      </section>
    </>
  );
}