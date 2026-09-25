"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ADMIN_ID = "user_3JpUFnk1yaEDHWw6DtZbouoE4gz";

interface Review {
  id: string;
  name: string;
  avatar: string | null;
  rating: number;
  text: string;
  approved: boolean;
  createdAt: string;
}

type Filter = "all" | "pending" | "approved";

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user && user.id !== ADMIN_ID) {
      router.push("/");
    }
  }, [user, isLoaded, router]);

  useEffect(() => {
    if (!isLoaded || !user || user.id !== ADMIN_ID) return;

    fetch("/api/admin/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isLoaded, user]);

  async function toggleApprove(id: string, current: boolean) {
    setProcessing(id);
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !current }),
    });
    if (res.ok) {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, approved: !current } : r))
      );
    }
    setProcessing(null);
  }

  async function deleteReview(id: string) {
    if (!confirm("Удалить отзыв навсегда?")) return;
    setProcessing(id);
    const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
    setProcessing(null);
  }

  if (!isLoaded || !user || user.id !== ADMIN_ID) {
    return (
      <section className="page-header">
        <h1 className="section-title">Проверка доступа...</h1>
      </section>
    );
  }

  const filtered = reviews.filter((r) => {
    if (filter === "pending") return !r.approved;
    if (filter === "approved") return r.approved;
    return true;
  });

  const total = reviews.length;
  const pendingCount = reviews.filter((r) => !r.approved).length;
  const approvedCount = reviews.filter((r) => r.approved).length;

  return (
    <>
      <section className="page-header">
        <h1 className="section-title">Админ-панель</h1>
        <p>Управление отзывами</p>
      </section>

      <section className="prices" style={{ maxWidth: "900px" }}>
        {/* ФИЛЬТРЫ */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() => setFilter("all")}
            className="btn"
            style={{
              background:
                filter === "all"
                  ? "rgba(139,92,246,0.3)"
                  : "rgba(139,92,246,0.1)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              padding: "0.6rem 1.2rem",
              fontSize: "0.95rem",
            }}
          >
            Все ({total})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className="btn"
            style={{
              background:
                filter === "pending"
                  ? "rgba(239,68,68,0.3)"
                  : "rgba(239,68,68,0.1)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              padding: "0.6rem 1.2rem",
              fontSize: "0.95rem",
            }}
          >
            На модерации ({pendingCount})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className="btn"
            style={{
              background:
                filter === "approved"
                  ? "rgba(34,197,94,0.3)"
                  : "rgba(34,197,94,0.1)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              padding: "0.6rem 1.2rem",
              fontSize: "0.95rem",
            }}
          >
            Одобренные ({approvedCount})
          </button>
        </div>

        {/* СПИСОК */}
        {loading ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
            Загрузка...
          </p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
            {filter === "all"
              ? "Отзывов пока нет"
              : filter === "pending"
              ? "Нет отзывов на модерации"
              : "Нет одобренных отзывов"}
          </p>
        ) : (
          filtered.map((r) => (
            <div
              className="price-card"
              key={r.id}
              style={{
                borderColor: r.approved
                  ? "rgba(34,197,94,0.4)"
                  : "rgba(239,68,68,0.4)",
                opacity: processing === r.id ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "1rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  {r.avatar && (
                    <img
                      src={r.avatar}
                      alt={r.name}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  <div>
                    <div
                      style={{ fontWeight: "bold", color: "var(--purple-light)" }}
                    >
                      {r.name}
                    </div>
                    <div style={{ color: "#fbbf24" }}>
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </div>
                    <div
                      style={{ fontSize: "0.8rem", color: "#6b7280" }}
                    >
                      {new Date(r.createdAt).toLocaleString("ru-RU")}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {/* СТАТУС */}
                  <span
                    style={{
                      padding: "0.4rem 0.8rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      background: r.approved
                        ? "rgba(34,197,94,0.2)"
                        : "rgba(239,68,68,0.2)",
                      color: r.approved ? "#34d399" : "#f87171",
                    }}
                  >
                    {r.approved ? "✅ Одобрен" : "⏳ На модерации"}
                  </span>

                  {/* КНОПКИ */}
                  <button
                    onClick={() => toggleApprove(r.id, r.approved)}
                    disabled={processing === r.id}
                    className="btn"
                    style={{
                      background: r.approved
                        ? "rgba(239,68,68,0.2)"
                        : "rgba(34,197,94,0.2)",
                      color: r.approved ? "#f87171" : "#34d399",
                      padding: "0.5rem 1rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {r.approved ? "❌ Скрыть" : "✅ Одобрить"}
                  </button>

                  <button
                    onClick={() => deleteReview(r.id)}
                    disabled={processing === r.id}
                    className="btn"
                    style={{
                      background: "rgba(239,68,68,0.2)",
                      color: "#f87171",
                      padding: "0.5rem 1rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    🗑 Удалить
                  </button>
                </div>
              </div>

              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
                {r.text}
              </p>
            </div>
          ))
        )}
      </section>
    </>
  );
}