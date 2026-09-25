"use client";

import { useState } from "react";

const SERVICES = [
  { id: "bot", label: "🤖 Программа на Python", price: 5000 },
  { id: "moderation", label: "🛡 Система модерации", price: 6000 },
  { id: "tickets", label: "🎫 Система тикетов", price: 8000 },
  { id: "ai", label: "🧠 AI-интеграция", price: 10000 },
  { id: "web", label: "🌐 Веб-приложение", price: 15000 },
  { id: "admin", label: "⚙️ Админ-панель", price: 8000 },
  { id: "api", label: "🔌 Интеграция с API", price: 6000 },
  { id: "db", label: "🗄 База данных", price: 7000 },
];

export default function Prices() {
  const [selected, setSelected] = useState<string[]>(
    SERVICES.map((s) => s.id)
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const subtotal = SERVICES.filter((s) => selected.includes(s.id)).reduce(
    (sum, s) => sum + s.price,
    0
  );

  const hasDiscount = selected.length >= 3;
  const discount = hasDiscount ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  return (
    <>
      <section className="page-header">
        <h1 className="section-title">Калькулятор стоимости</h1>
        <p>Отметь нужные модули — цена посчитается автоматически</p>
      </section>

      <section className="prices" style={{ maxWidth: "900px" }}>
        <div className="price-card" style={{ display: "grid", gap: "1rem" }}>
          {SERVICES.map((service) => {
            const isSelected = selected.includes(service.id);
            return (
              <label
                key={service.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  background: isSelected
                    ? "rgba(139,92,246,0.1)"
                    : "transparent",
                  border: `1px solid ${
                    isSelected ? "var(--purple)" : "var(--border)"
                  }`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(service.id)}
                  style={{
                    width: "20px",
                    height: "20px",
                    accentColor: "var(--purple)",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    color: isSelected ? "var(--purple-light)" : "var(--text-muted)",
                    fontWeight: isSelected ? 600 : 400,
                    transition: "color 0.25s ease",
                  }}
                >
                  {service.label}
                </span>
                <span
                  style={{
                    color: "var(--purple-light)",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  +{service.price.toLocaleString("ru-RU")} ₽
                </span>
              </label>
            );
          })}
        </div>

        <div
          className="cta"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(109,40,217,0.2))",
          }}
        >
          {hasDiscount && (
            <div
              style={{
                marginBottom: "1rem",
                padding: "0.6rem 1rem",
                background: "rgba(52,211,153,0.15)",
                border: "1px solid rgba(52,211,153,0.4)",
                borderRadius: "10px",
                color: "#34d399",
                fontSize: "0.9rem",
                display: "inline-block",
              }}
            >
              🎉 Скидка 10% за комплекс ({selected.length} модулей)
            </div>
          )}

          <h2
            style={{
              fontSize: "2rem",
              transition: "all 0.3s ease",
            }}
          >
            Итого:{" "}
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.3s ease, color 0.3s ease",
                transform: hasDiscount ? "scale(1.05)" : "scale(1)",
              }}
            >
              {total.toLocaleString("ru-RU")} ₽
            </span>
            {hasDiscount && (
              <span
                style={{
                  marginLeft: "0.8rem",
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  textDecoration: "line-through",
                }}
              >
                {subtotal.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </h2>

          <p style={{ fontSize: "0.9rem", marginBottom: "1.5rem", color: "var(--text-muted)" }}>
            Это предварительная оценка. Точная цена — после обсуждения ТЗ.
          </p>

          <a
            href="https://t.me/Sk1lzzz"
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
          >
            ✈️ Обсудить проект
          </a>
        </div>
      </section>
    </>
  );
}