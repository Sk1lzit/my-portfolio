"use client";

import { useEffect, useState } from "react";

export default function OnlineStatus() {
  const [status, setStatus] = useState({
    online: false,
    text: "Проверяю...",
    color: "#9ca3af",
  });

  useEffect(() => {
    const update = () => {
      // МСК = UTC+3
      const now = new Date();
      const utcHours = now.getUTCHours();
      const mskHours = (utcHours + 3) % 24;

      if (mskHours >= 9 && mskHours < 23) {
        setStatus({
          online: true,
          text: "Отвечу в течение 15 минут",
          color: "#34d399",
        });
      } else {
        setStatus({
          online: false,
          text: "Отвечу утром (после 9:00 МСК)",
          color: "#a78bfa",
        });
      }
    };

    update();
    const interval = setInterval(update, 60000); // раз в минуту
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="contact-card"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.8rem",
        padding: "1.2rem 2rem",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto 2rem",
      }}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: status.color,
          boxShadow: `0 0 15px ${status.color}`,
          flexShrink: 0,
          animation: status.online ? "pulseOnline 2s infinite" : "none",
        }}
      />
      <span
        style={{
          color: "var(--text)",
          fontSize: "1rem",
          fontWeight: 500,
        }}
      >
        {status.text}
      </span>
    </div>
  );
}