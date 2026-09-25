import Image from "next/image";

interface CaseCardProps {
  icon: string;
  title: string;
  tags: string[];
  images?: string[];
  problem: string;
  solution: string;
  result: string;
}

export default function CaseCard({
  icon,
  title,
  tags,
  images = [],
  problem,
  solution,
  result,
}: CaseCardProps) {
  return (
    <article
      className="project-card"
      style={{ display: "block", padding: "2.5rem" }}
    >
      {/* ЗАГОЛОВОК */}
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            color: "var(--purple-light)",
            fontSize: "1.8rem",
            marginBottom: "1rem",
          }}
        >
          {icon} {title}
        </h2>
        <div className="project-tags">
          {tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* СКРИНЫ */}
      {images.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              images.length > 1
                ? "repeat(auto-fit, minmax(320px, 1fr))"
                : "1fr",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {images.map((img) => (
            <div
              key={img}
              style={{
                width: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--border)",
                background: "var(--bg-dark)",
                padding: "0.5rem",
              }}
            >
              <Image
                src={`/images/${img}`}
                alt={title}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={95}
                priority
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ПРОБЛЕМА / РЕШЕНИЕ / РЕЗУЛЬТАТ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            borderLeft: "4px solid #ef4444",
            background: "rgba(239,68,68,0.05)",
            padding: "1.5rem",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <div
            style={{
              color: "#f87171",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.85rem",
              marginBottom: "0.8rem",
            }}
          >
            ❌ Проблема
          </div>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
            {problem}
          </p>
        </div>

        <div
          style={{
            borderLeft: "4px solid #a78bfa",
            background: "rgba(167,139,250,0.05)",
            padding: "1.5rem",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <div
            style={{
              color: "#a78bfa",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.85rem",
              marginBottom: "0.8rem",
            }}
          >
            💡 Решение
          </div>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
            {solution}
          </p>
        </div>

        <div
          style={{
            borderLeft: "4px solid #34d399",
            background: "rgba(52,211,153,0.05)",
            padding: "1.5rem",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <div
            style={{
              color: "#34d399",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.85rem",
              marginBottom: "0.8rem",
            }}
          >
            ✅ Результат
          </div>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
            {result}
          </p>
        </div>
      </div>
    </article>
  );
}