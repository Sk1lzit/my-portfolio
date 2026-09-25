"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function EasterEgg() {
  const [index, setIndex] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (key === KONAMI[index]) {
        const newIndex = index + 1;
        if (newIndex === KONAMI.length) {
          setTriggered(true);
          setIndex(0);

          // Активируем пасхалку
          document.body.classList.add("party-mode");
          document.documentElement.style.setProperty(
            "--purple",
            "#ff6ec7"
          );
          document.documentElement.style.setProperty(
            "--purple-light",
            "#ffb3e6"
          );

          // Сообщение
          setTimeout(() => {
            alert(
              "🎉 Ты нашёл пасхалку!\n\nТы настоящий гик, как и я. Пиши — сделаем что-то крутое!"
            );
          }, 100);
        } else {
          setIndex(newIndex);
        }
      } else {
        setIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index]);

  if (!triggered) return null;

  return (
    <button
      onClick={() => {
        setTriggered(false);
        document.body.classList.remove("party-mode");
        document.documentElement.style.removeProperty("--purple");
        document.documentElement.style.removeProperty("--purple-light");
      }}
      style={{
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        background: "linear-gradient(135deg, #ff6ec7, #ffb3e6)",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "20px",
        cursor: "pointer",
        zIndex: 9999,
        fontWeight: 600,
        boxShadow: "0 0 30px rgba(255, 110, 199, 0.8)",
      }}
    >
      🎉 Пасхалка активирована — нажми, чтобы выключить
    </button>
  );
}