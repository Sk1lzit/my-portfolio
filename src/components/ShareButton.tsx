"use client";

import { useState } from "react";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = async () => {
    // Проверяем Web Share API (мобильные)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || title,
          url: shareUrl,
        });
        return;
      } catch {
        // Пользователь отменил — игнорируем
      }
    }

    // Fallback — копируем в буфер
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Не удалось скопировать. Скопируйте вручную: " + shareUrl);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="btn btn-secondary"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.6rem 1.2rem",
        fontSize: "0.9rem",
      }}
      aria-label="Поделиться"
    >
      {copied ? "✅ Скопировано" : "🔗 Поделиться"}
    </button>
  );
}