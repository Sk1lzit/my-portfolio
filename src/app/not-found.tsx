import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section
        className="page-header"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 2rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(6rem, 20vw, 12rem)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            margin: 0,
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "1.8rem",
            color: "var(--text)",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          Страница не найдена
        </h2>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            maxWidth: "500px",
            marginBottom: "2.5rem",
            lineHeight: 1.7,
          }}
        >
          Возможно, страница была удалена или вы ошиблись в адресе.
          Но вы можете вернуться на главную или посмотреть проекты.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link href="/" className="btn btn-primary">
            🏠 На главную
          </Link>
          <Link href="/works" className="btn btn-secondary">
            📁 Проекты
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            ✉️ Связаться
          </Link>
        </div>
      </section>
    </>
  );
}