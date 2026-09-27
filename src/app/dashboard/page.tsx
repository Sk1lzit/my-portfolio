"use client";

import { useEffect, useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import Deadline from "@/components/Deadline";

interface Order {
  id: string;
  nickname: string;
  brief: string;
  contacts: string;
  price: number;
  deadline: string;
  status: "IN_PROGRESS" | "DONE" | "CANCELLED";
  createdAt: string;
}

export default function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [role, setRole] = useState<string>("USER");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) return;

    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders || []);
        setTotalSpent(data.totalSpent || 0);
        setRole(data.role || "USER");
      })
      .finally(() => setLoading(false));
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <section className="page-header">
        <h1 className="section-title">Загрузка...</h1>
      </section>
    );
  }

  if (!isSignedIn) {
    return (
      <section className="page-header" style={{ textAlign: "center", padding: "6rem 2rem" }}>
        <h1 className="section-title">Личный кабинет</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          Войдите, чтобы увидеть свои заказы
        </p>
        <SignInButton mode="modal">
          <button className="btn btn-primary">Войти</button>
        </SignInButton>
      </section>
    );
  }

  return (
    <>
      <section className="page-header">
        <h1 className="section-title">
          Привет, {user?.firstName || user?.username || "друг"}! 👋
        </h1>
        <p>Личный кабинет</p>
      </section>

      <section className="prices" style={{ maxWidth: "1100px" }}>
        {/* Сводка */}
        <div
          className="price-card"
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--purple-light)" }}>
              {orders.length}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Всего заказов</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--purple-light)" }}>
              {totalSpent.toLocaleString("ru-RU")} ₽
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Потрачено</div>
          </div>
          {role === "ADMIN" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#fbbf24" }}>
                ADMIN
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Твоя роль</div>
            </div>
          )}
        </div>

        {/* Таблица заказов */}
        {loading ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Загрузка заказов...</p>
        ) : orders.length === 0 ? (
          <div className="price-card" style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              У тебя пока нет заказов
            </p>
            <a href="/prices" className="btn btn-primary">
              Посмотреть услуги
            </a>
          </div>
        ) : (
          <div
            className="price-card"
            style={{ overflowX: "auto", padding: "1rem" }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "800px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "1rem", textAlign: "left", color: "var(--text-muted)", fontSize: "0.85rem" }}>Ник</th>
                  <th style={{ padding: "1rem", textAlign: "left", color: "var(--text-muted)", fontSize: "0.85rem" }}>ТЗ</th>
                  <th style={{ padding: "1rem", textAlign: "left", color: "var(--text-muted)", fontSize: "0.85rem" }}>Контакты</th>
                  <th style={{ padding: "1rem", textAlign: "left", color: "var(--text-muted)", fontSize: "0.85rem" }}>Цена</th>
                  <th style={{ padding: "1rem", textAlign: "left", color: "var(--text-muted)", fontSize: "0.85rem" }}>Дедлайн</th>
                  <th style={{ padding: "1rem", textAlign: "left", color: "var(--text-muted)", fontSize: "0.85rem" }}>Статус</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "1rem", fontWeight: 600, color: "var(--purple-light)" }}>{order.nickname}</td>
                    <td style={{ padding: "1rem", color: "var(--text)", maxWidth: "300px" }}>{order.brief}</td>
                    <td style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>{order.contacts}</td>
                    <td style={{ padding: "1rem", color: "var(--purple-light)", fontWeight: 600, whiteSpace: "nowrap" }}>
                      {order.price.toLocaleString("ru-RU")} ₽
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <Deadline
                        deadline={order.deadline}
                        createdAt={order.createdAt}
                        status={order.status}
                      />
                    </td>
                    <td style={{ padding: "1rem" }}>
                      {order.status === "IN_PROGRESS" && "🔄 В работе"}
                      {order.status === "DONE" && "✅ Выполнен"}
                      {order.status === "CANCELLED" && "❌ Отменён"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}