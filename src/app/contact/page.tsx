export const metadata = {
  title: "Contact — Sk1lz",
};

export default function Contact() {
  return (
    <>
      <section className="page-header">
        <h1 className="section-title">Свяжитесь со мной</h1>
        <p>Отвечу в течение 15 минут</p>
      </section>

      <section className="contacts">
        <a
          href="https://discord.com/users/670944110630273024"
          className="contact-card"
          target="_blank"
          rel="noopener"
        >
          <div className="contact-icon">💬</div>
          <h3>Discord</h3>
          <p className="contact-value">_sk1lz</p>
        </a>
        <a
          href="https://t.me/Sk1lzzz"
          className="contact-card"
          target="_blank"
          rel="noopener"
        >
          <div className="contact-icon">✈️</div>
          <h3>Telegram</h3>
          <p className="contact-value">@Sk1lzzz</p>
        </a>
        <a
          href="https://github.com/Sk1lzit"
          className="contact-card"
          target="_blank"
          rel="noopener"
        >
          <div className="contact-icon">💻</div>
          <h3>GitHub</h3>
          <p className="contact-value">Sk1lzit</p>
        </a>
      </section>

      <section className="form-section">
        <h2 className="section-title">Или напишите здесь</h2>
        <form className="contact-form">
          <input type="text" name="name" placeholder="Ваше имя" required />
          <input type="email" name="email" placeholder="Email или Telegram" required />
          <textarea name="message" placeholder="Опишите задачу..." rows={6} required />

          <label className="checkbox-label">
            <input type="checkbox" name="consent" required />
            <span>
              Я согласен с <a href="/privacy">Политикой конфиденциальности</a> и даю{" "}
              <a href="/terms">согласие на обработку персональных данных</a>
            </span>
          </label>

          <button type="submit" className="btn btn-primary">
            Отправить
          </button>
        </form>
      </section>
    </>
  );
}