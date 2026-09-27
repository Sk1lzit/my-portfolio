"use client";

import { useEffect, useState } from "react";

interface DeadlineProps {
  deadline: string | Date;
  createdAt: string | Date;
  status: "IN_PROGRESS" | "DONE" | "CANCELLED";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  percent: number;
}

function getTimeLeft(deadline: Date, createdAt: Date): TimeLeft {
  const now = Date.now();
  const end = deadline.getTime();
  const start = createdAt.getTime();
  const totalDuration = end - start;
  const remaining = end - now;

  if (remaining <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, percent: 0 };
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  const percent = totalDuration > 0 ? (remaining / totalDuration) * 100 : 100;

  return { days, hours, minutes, seconds, total: remaining, percent };
}

function getColor(percent: number, isOverdue: boolean, isDone: boolean): string {
  if (isDone) return "#3b82f6"; // синий — выполнено
  if (isOverdue) return "#000000"; // чёрный — просрочено
  if (percent >= 70) return "#34d399"; // зелёный
  if (percent >= 50) return "#fbbf24"; // жёлтый
  if (percent >= 30) return "#fb923c"; // оранжевый
  return "#f87171"; // красный
}

export default function Deadline({ deadline, createdAt, status }: DeadlineProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const deadlineDate = new Date(deadline);
    const createdDate = new Date(createdAt);

    const update = () => {
      setTimeLeft(getTimeLeft(deadlineDate, createdDate));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [deadline, createdAt]);

  if (!timeLeft) {
    return <span style={{ color: "var(--text-muted)" }}>—</span>;
  }

  const isOverdue = timeLeft.total <= 0 && status === "IN_PROGRESS";
  const isDone = status === "DONE";
  const color = getColor(timeLeft.percent, isOverdue, isDone);

  if (isDone) {
    return (
      <span
        style={{
          color,
          fontWeight: 600,
          padding: "0.3rem 0.8rem",
          background: "rgba(59,130,246,0.15)",
          border: `1px solid ${color}`,
          borderRadius: "8px",
          fontSize: "0.9rem",
          whiteSpace: "nowrap",
        }}
      >
        ✅ Выполнено
      </span>
    );
  }

  if (isOverdue) {
    return (
      <span
        style={{
          color,
          fontWeight: 600,
          padding: "0.3rem 0.8rem",
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${color}`,
          borderRadius: "8px",
          fontSize: "0.9rem",
          whiteSpace: "nowrap",
        }}
      >
        ⚫ Просрочено
      </span>
    );
  }

  return (
    <span
      style={{
        color,
        fontWeight: 600,
        padding: "0.3rem 0.8rem",
        background: `${color}22`,
        border: `1px solid ${color}`,
        borderRadius: "8px",
        fontSize: "0.9rem",
        whiteSpace: "nowrap",
      }}
    >
      {timeLeft.days > 0 && `${timeLeft.days}д `}
      {timeLeft.hours > 0 && `${timeLeft.hours}ч `}
      {timeLeft.minutes > 0 && `${timeLeft.minutes}м `}
      {timeLeft.seconds}с
    </span>
  );
}