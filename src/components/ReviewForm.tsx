"use client";

import { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { showToast } from "@/components/Toast";

export default function ReviewForm({ onSuccess }: { onSuccess?: () => void }) {
  const { isSignedIn } = useUser();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!isSignedIn) {
    return (
      <div className="price-card" style={{ textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
          Войдите, чтобы оставить отзыв
        </p>
        <SignInButton mode="modal">
          <button className="btn btn-primary">Войти</button>
        </SignInButton>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, text }),
      });

      if (res.ok) {
        setStatus("sent");
        setText("");
        setRating(5);
        onSuccess?.();
        showToast("Отзыв отправлен на модерацию", "success");
      } else {
        const data = await res.json();
        showToast(data.error || "Ошибка отправки", "error");
        setStatus("error");
      }
    } catch {
      showToast("Не удалось отправить. Попробуйте позже", "error");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="price-card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h3 style={{ color: "var(--purple-light)" }}>Оставить отзыв</h3>

      <div>
        <label style={{ color: "var(--text-muted)", display: "block", marginBottom: "0.5rem" }}>Оценка:</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "2rem",
                cursor: "pointer",
                color: n <= rating ? "#fbbf24" : "#4b5563",
                padding: 0,
              }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Напишите ваш отзыв..."
        rows={5}
        required
        minLength={5}
        maxLength={1000}
        className="contact-form"
        style={{
          background: "var(--bg-dark)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "1rem",
          color: "var(--text)",
          fontFamily: "inherit",
          fontSize: "1rem",
          resize: "vertical",
        }}
      />

      <button
        type="submit"
        disabled={status === "sending" || text.trim().length < 5}
        className="btn btn-primary"
      >
        {status === "sending" ? "Отправка..." : "Отправить отзыв"}
      </button>

      {status === "sent" && (
        <p style={{ color: "#34d399", textAlign: "center" }}>
          ✅ Отзыв отправлен на модерацию!
        </p>
      )}
    </form>
  );
}