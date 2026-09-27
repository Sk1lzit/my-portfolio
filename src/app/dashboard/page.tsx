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

        {role === "ADMIN" && (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              marginTop: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <a href="/admin" className="btn btn-secondary">💬 Отзывы</a>
            <a href="/admin/orders" className="btn btn-secondary">📦 Заказы</a>
            <a href="/admin/projects" className="btn btn-secondary">💼 Проекты</a>
            <a href="/admin/notes" className="btn btn-secondary">📝 Заметки</a>
          </div>
        )}
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
          <div className="price-card" style={{ overflowX: "auto", padding: "1rem" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "800px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={thStyle}>Ник</th>
                  <th style={thStyle}>ТЗ</th>
                  <th style={thStyle}>Контакты</th>
                  <th style={thStyle}>Цена</th>
                  <th style={thStyle}>Дедлайн</th>
                  <th style={thStyle}>Статус</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={tdStyle}>
                      <span style={{ fontWeight: 600, color: "var(--purple-light)" }}>
                        {order.nickname}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, maxWidth: "300px" }}>{order.brief}</td>
                    <td style={{ ...tdStyle, color: "var(--text-muted)", fontSize: "0.9rem" }}>
                      {order.contacts}
                    </td>
                    <td style={{ ...tdStyle, color: "var(--purple-light)", fontWeight: 600, whiteSpace: "nowrap" }}>
                      {order.price.toLocaleString("ru-RU")} ₽
                    </td>
                    <td style={tdStyle}>
                      <Deadline
                        deadline={order.deadline}
                        createdAt={order.createdAt}
                        status={order.status}
                      />
                    </td>
                    <td style={tdStyle}>
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

const thStyle: React.CSSProperties = {
  padding: "1rem",
  textAlign: "left",
  color: "var(--text-muted)",
  fontSize: "0.85rem",
};

const tdStyle: React.CSSProperties = {
  padding: "1rem",
  color: "var(--text)",
};