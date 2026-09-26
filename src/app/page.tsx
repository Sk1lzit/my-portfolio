import Link from "next/link";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import ReviewsList from "@/components/ReviewsList";
import ReviewForm from "@/components/ReviewForm";
import SkillBar from "@/components/SkillBar";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <Image
              src="/images/avatar.png"
              alt="Sk1lz"
              width={150}
              height={150}
            />
          </div>
          <p className="hero-greeting">
            Hello! I am <span className="highlight">Sk1lz</span>
          </p>
          <h1 className="hero-title">
            I'm a{" "}
            <Typewriter
              texts={["Frontend Developer", "Discord Bot Developer", "Website Coder"]}
              className="typewriter"
            />
          </h1>
          <p className="hero-subtitle">
            Создаю ботов и веб-приложения, которые автоматизируют рутину
            и приносят прибыль.
          </p>
          <div className="hero-buttons">
            <a
              href="https://t.me/Sk1lzzz"
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              ✈️ Заказать в Telegram
            </a>
            <Link href="/works" className="btn btn-secondary">Мои проекты
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2 className="section-title">Обо мне</h2>
        <div className="about-content">
          <p>
            Закончил онлайн-школу <strong>SkillFactory</strong> по специализации{" "}
            <strong>Frontend-разработчик</strong>. Владею языками:{" "}
            <strong>Python, Java, JavaScript, C++, C#, HTML</strong>.
          </p>
          <p>
            Работаю с <strong>React</strong> (хуки), <strong>Git</strong> и современными
            инструментами. В Discord-разработке использую <strong>discord.py</strong>,
            Slash-команды, гибридные команды, интерактивные меню.
          </p>

          <h3 style={{ textAlign: "center", color: "var(--purple-light)", marginTop: "2rem", marginBottom: "1rem" }}>
            Навыки
          </h3>
          <div className="skills-bars">
            {[
              ["Python", 85],
              ["JavaScript", 80],
              ["React", 75],
              ["discord.py", 90],
              ["Git", 80],
              ["HTML/CSS", 90],
              ].map(([name, val]) => (
              <SkillBar key={name as string} name={name as string} value={val as number} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process">
        <h2 className="section-title">Как я работаю</h2>
        <div className="process-grid">
          {[
            { n: "01", t: "Обсуждение ТЗ", d: "Обсуждаем задачу, детали, сроки и цену" },
            { n: "02", t: "План работы", d: "Составляю план и этапы разработки" },
            { n: "03", t: "Разработка", d: "Пишу код, показываю промежуточные результаты" },
            { n: "04", t: "Тестирование", d: "Проверяю всё, исправляю баги" },
            { n: "05", t: "Сдача и поддержка", d: "Передаю готовый проект и помогаю с запуском" },
          ].map((s) => (
            <div className="process-card" key={s.n}>
              <div className="process-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Готов обсудить проект?</h2>
        <p>Пиши — отвечу в течение 15 минут</p>
        <div className="hero-buttons">
          <a
            href="https://t.me/Sk1lzzz"
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
          >
            ✈️ Telegram
          </a>
          <Link href="/contact" className="btn btn-secondary">
            Все контакты
          </Link>
        </div>
      </section>
      {/* ОТЗЫВЫ */}
<section className="about" style={{ maxWidth: "900px", margin: "0 auto" }}>
  <h2 className="section-title">Отзывы</h2>
  <ReviewsList />
  <div style={{ marginTop: "2rem", maxWidth: "600px", margin: "2rem auto 0" }}>
    <ReviewForm />
  </div>
</section>
    </>
  );
}