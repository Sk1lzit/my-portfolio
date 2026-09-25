export const metadata = {
  title: "Цены — Sk1lz",
};

export default function Prices() {
  return (
    <>
      <section className="page-header">
        <h1 className="section-title">Цены на услуги</h1>
        <p>Цены указаны со скидкой 15% от среднерыночных</p>
      </section>

      <section className="prices">
        <div className="price-card">
          <h2>🤖 Discord-боты</h2>
          <ul className="price-list">
            <li><span>Простые команды (до 5 шт.)</span><span className="price">от 3 500 ₽</span></li>
            <li><span>Модерация + статистика</span><span className="price">от 7 000 ₽</span></li>
            <li><span>Тикеты + верификация</span><span className="price">от 8 500 ₽</span></li>
            <li><span>AI-интеграция (нейросеть)</span><span className="price">от 9 000 ₽</span></li>
            <li><span>Полный бот под задачу</span><span className="price">индивидуально</span></li>
          </ul>
        </div>

        <div className="price-card">
          <h2>💻 Веб-разработка</h2>
          <ul className="price-list">
            <li><span>Лендинг (1 страница)</span><span className="price">от 5 000 ₽</span></li>
            <li><span>Многостраничный сайт</span><span className="price">от 10 000 ₽</span></li>
            <li><span>Сайт-портфолио</span><span className="price">от 7 000 ₽</span></li>
            <li><span>Веб-приложение на React</span><span className="price">от 15 000 ₽</span></li>
          </ul>
        </div>

        <div className="price-card">
          <h2>⚙️ Автоматизация</h2>
          <ul className="price-list">
            <li><span>Скрипт на Python</span><span className="price">от 3 000 ₽</span></li>
            <li><span>Парсер сайтов</span><span className="price">от 4 000 ₽</span></li>
            <li><span>Интеграция с API</span><span className="price">от 5 000 ₽</span></li>
            <li><span>Telegram-бот</span><span className="price">от 4 500 ₽</span></li>
          </ul>
        </div>
      </section>

      <section className="cta">
        <h2>Не нашли нужную услугу?</h2>
        <p>Напишите — обсудим индивидуально</p>
        <a
          href="https://t.me/Sk1lzzz"
          target="_blank"
          rel="noopener"
          className="btn btn-primary"
        >
          ✈️ Написать в Telegram
        </a>
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