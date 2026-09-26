"use client";

import { useEffect, useState } from "react";

export interface ToastData {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

let toastId = 0;
let addToastFn: ((message: string, type: ToastData["type"]) => void) | null = null;

export function showToast(message: string, type: ToastData["type"] = "info") {
  if (addToastFn) addToastFn(message, type);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    addToastFn = (message, type) => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
    return () => {
      addToastFn = null;
    };
  }, []);

  const colors = {
    success: { bg: "rgba(52,211,153,0.15)", border: "#34d399", text: "#34d399", icon: "✅" },
    error: { bg: "rgba(239,68,68,0.15)", border: "#f87171", text: "#f87171", icon: "❌" },
    info: { bg: "rgba(139,92,246,0.15)", border: "#a78bfa", text: "#a78bfa", icon: "ℹ️" },
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        pointerEvents: "none",
        maxWidth: "90vw",
      }}
    >
      {toasts.map((toast) => {
        const c = colors[toast.type];
        return (
          <div
            key={toast.id}
            style={{
              background: c.bg,
              border: `1px solid ${c.border}`,
              color: c.text,
              padding: "0.8rem 1.5rem",
              borderRadius: "12px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              animation: "toastIn 0.3s ease",
              pointerEvents: "auto",
            }}
          >
            <span>{c.icon}</span>
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}