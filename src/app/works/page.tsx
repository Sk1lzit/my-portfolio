import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "My Projects — Sk1lz",
};

export default function Projects() {
  return (
    <>
      <section className="page-header">
        <h1 className="section-title">My Projects</h1>
        <p>Проекты, которые я сделал</p>
      </section>

      <section className="projects">
        {/* AVATARI */}
        <div className="project-card">
          <div className="project-images">
            <Image
              src="/images/avatari-1.png"
              alt="Avatari - help"
              width={500}
              height={300}
              className="project-img"
            />
            <Image
              src="/images/avatari-2.png"
              alt="Avatari - menu"
              width={500}
              height={300}
              className="project-img"
            />
            <Image
              src="/images/avatari-3.png"
              alt="Avatari - AI"
              width={500}
              height={300}
              className="project-img"
            />
          </div>
          <div className="project-info">
            <h2>🤖 Avatari — Discord Bot</h2>
            <p>
              Многофункциональный Discord-бот: модерация с авто-мутом,
              статистика с фильтрами, тикеты с верификацией, диалог с
              нейросетью, генерация изображений, логирование в Telegram,
              меню управления правами.
            </p>
            <div className="project-tags">
              <span className="tag">Python</span>
              <span className="tag">discord.py</span>
              <span className="tag">OpenRouter</span>
              <span className="tag">Telegram API</span>
            </div>
          </div>
        </div>

        {/* PORTFOLIO */}
        <div className="project-card">
          <div className="project-images">
            <Image
              src="/images/portfolio-1.png"
              alt="Portfolio"
              width={500}
              height={300}
              className="project-img"
            />
          </div>
          <div className="project-info">
            <h2>🌐 Портфолио-сайт</h2>
            <p>
              Личный сайт-портфолио с тёмной темой, анимациями,
              навигацией и адаптивным дизайном. Сделан на Next.js,
              задеплоен на Vercel.
            </p>
            <div className="project-tags">
              <span className="tag">Next.js</span>
              <span className="tag">React</span>
              <span className="tag">Tailwind</span>
              <span className="tag">Vercel</span>
            </div>
          </div>
        </div>

        {/* PRESENTATION */}
        <div className="project-card">
          <div className="project-images">
            <Image
              src="/images/presentation-1.png"
              alt="Presentation"
              width={500}
              height={300}
              className="project-img"
            />
          </div>
          <div className="project-info">
            <h2>📊 Презентация структуры сервера</h2>
            <p>
              Интерактивная схема иерархии персонала Discord-сервера.
              Кликабельные карточки, ссылки на профили, адаптивный дизайн.
            </p>
            <div className="project-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">JavaScript</span>
            </div>
          </div>
        </div>

        {/* COMING SOON */}
        <div className="project-card coming-soon">
          <div className="project-info">
            <h2>⚙️ Скоро...</h2>
            <p>Здесь появятся новые проекты. Следи за обновлениями.</p>
          </div>
        </div>
      </section>
    </>
  );
}