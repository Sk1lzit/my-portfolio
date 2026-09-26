"use client";

import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Переключить тему"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "rgba(139,92,246,0.15)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        fontSize: "1.1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s",
        color: "var(--text)",
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}