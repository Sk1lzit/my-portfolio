import Image from "next/image";

export const metadata = {
  title: "Обо мне — Sk1lz",
  description: "Артем — Frontend-разработчик, выпускник SkillFactory",
};

export default function About() {
  return (
    <>
      {/* ЗАГОЛОВОК */}
      <section className="page-header">
        <h1 className="section-title">Обо мне</h1>
        <p>Frontend-разработчик · Discord Bot Developer</p>
      </section>

      {/* HERO — ФОТО + ИМЯ */}
      <section
        className="about"
        style={{ maxWidth: "900px", margin: "0 auto 3rem", padding: "0 2rem" }}
      >
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <Image
              src="/images/avatar.png"
              alt="Артем"
              width={180}
              height={180}
              style={{
                borderRadius: "50%",
                border: "3px solid var(--purple)",
                boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)",
                objectFit: "cover",
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: "280px" }}>
            <h2
              style={{
                fontSize: "2rem",
                color: "var(--purple-light)",
                marginBottom: "0.5rem",
              }}
            >
              Артем
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "1rem" }}>
              Автоматизирую бизнес-процессы · Разрабатываю ботов и веб-приложения
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="https://t.me/Sk1lzzz"
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
                style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}
              >
                ✈️ Telegram
              </a>
              <a
                href="https://github.com/Sk1lzit"
                target="_blank"
                rel="noopener"
                className="btn btn-secondary"
                style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}
              >
                💻 GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ОБРАЗОВАНИЕ */}
      <section className="about" style={{ maxWidth: "900px", margin: "0 auto 3rem", padding: "0 2rem" }}>
        <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "2rem" }}>
          Образование
        </h2>

        <div
          className="price-card"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
          }}
        >
          <div>
            <div
              style={{
                color: "var(--purple-light)",
                fontWeight: 700,
                fontSize: "1.3rem",
                marginBottom: "0.5rem",
              }}
            >
              🎓 SkillFactory
            </div>
            <p style={{ color: "var(--text)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              <strong>Специализация:</strong> Frontend-разработчик
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
              Проектирую архитектуру на Next.js, интегрирую сложные API, настраиваю CI/CD
              на Vercel. Разрабатываю Discord-ботов с автоматизацией модерации и интеграцией
              нейросетей. Работаю с Prisma, Clerk, PostgreSQL.
            </p>
          </div>

          {/* ДИПЛОМ */}
          <div>
            <div
              style={{
                color: "var(--purple-light)",
                fontWeight: 700,
                fontSize: "1.1rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              📜 Диплом
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--border)",
                background: "var(--bg-dark)",
                padding: "1rem",
              }}
            >
              <Image
                src="/images/diploma.png"
                alt="Диплом SkillFactory"
                width={1600}
                height={1100}
                sizes="(max-width: 768px) 100vw, 800px"
                quality={95}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </div>

            <p
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                marginTop: "0.8rem",
              }}
            >
              Диплом об окончании SkillFactory
            </p>
          </div>
        </div>
      </section>

      {/* НАВЫКИ */}
      <section className="about" style={{ maxWidth: "900px", margin: "0 auto 3rem", padding: "0 2rem" }}>
        <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "2rem" }}>
          Навыки
        </h2>

        <div className="skills-bars" style={{ maxWidth: "100%" }}>
          {[
            ["Python", 85],
            ["JavaScript", 80],
            ["React", 75],
            ["discord.py", 90],
            ["HTML/CSS", 90],
            ["Git", 80],
            ["Next.js", 75],
            ["TypeScript", 70],
          ].map(([name, val]) => (
            <div className="skill-bar" key={name}>
              <div className="skill-header">
                <span>{name}</span>
                <span>{val}%</span>
              </div>
              <div className="skill-progress">
                <div className="skill-fill" style={{ width: `${val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ЧТО УМЕЮ */}
      <section className="about" style={{ maxWidth: "900px", margin: "0 auto 3rem", padding: "0 2rem" }}>
        <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "2rem" }}>
          Что я умею
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {[
            {
              icon: "🤖",
              title: "Discord-боты",
              desc: "Разработка ботов любой сложности: модерация, статистика, тикеты, нейросети, генерация изображений, интеграции с API.",
            },
            {
              icon: "🌐",
              title: "Веб-разработка",
              desc: "Сайты на React и Next.js, лендинги, портфолио, веб-приложения. Адаптивный дизайн, современные анимации.",
            },
            {
              icon: "⚙️",
              title: "Автоматизация",
              desc: "Скрипты на Python, парсеры сайтов, интеграции с API, автоматизация рутинных задач.",
            },
            {
              icon: "🎨",
              title: "UI/UX",
              desc: "Продуманные интерфейсы, тёмные темы, градиенты, анимации. Работа с Tailwind CSS и кастомным CSS.",
            },
          ].map((item) => (
            <div key={item.title} className="price-card">
              <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>{item.icon}</div>
              <h3 style={{ color: "var(--purple-light)", marginBottom: "0.8rem", fontSize: "1.2rem" }}>
                {item.title}
              </h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Хочешь со мной работать?</h2>
        <p>Напиши — обсудим проект</p>
        <a
          href="https://t.me/Sk1lzzz"
          target="_blank"
          rel="noopener"
          className="btn btn-primary"
        >
          ✈️ Написать в Telegram
        </a>
      </section>
    </>
  );
}