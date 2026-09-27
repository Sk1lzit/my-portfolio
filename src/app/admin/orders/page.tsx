"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Deadline from "@/components/Deadline";

interface Order {
  id: string;
  nickname: string;
  brief: string;
  contacts: string;
  price: number;
  deadline: string;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
}

export default function AdminOrders() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    clerkId: "",
    nickname: "",
    brief: "",
    contacts: "",
    price: "",
    deadline: "",
  });

  const fetchOrders = () => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!user || user.id !== "user_3JpUFnk1yaEDHWw6DtZbouoE4gz") {
      router.push("/");
      return;
    }
    fetchOrders();
  }, [isLoaded, user, router]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ clerkId: "", nickname: "", brief: "", contacts: "", price: "", deadline: "" });
      setShowForm(false);
      fetchOrders();
    } else {
      const data = await res.json();
      alert(data.error || "Ошибка");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить заказ?")) return;
    await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
    fetchOrders();
  };

  if (!isLoaded || loading) {
    return (
      <section className="page-header">
        <h1 className="section-title">Загрузка...</h1>
      </section>
    );
  }

  return (
    <>
      <section className="page-header">
        <h1 className="section-title">Управление заказами</h1>
        <p>Создание, редактирование, удаление</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
          style={{ marginTop: "1.5rem" }}
        >
          {showForm ? "Отмена" : "+ Создать заказ"}
        </button>
      </section>

      {showForm && (
        <section className="prices" style={{ maxWidth: "700px" }}>
          <form onSubmit={handleCreate} className="price-card" style={{ display: "grid", gap: "1rem" }}>
            <input
              placeholder="Clerk ID клиента (user_...)"
              value={form.clerkId}
              onChange={(e) => setForm({ ...form, clerkId: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              placeholder="Ник клиента"
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value })}
              required
              style={inputStyle}
            />
            <textarea
              placeholder="ТЗ (описание задачи)"
              value={form.brief}
              onChange={(e) => setForm({ ...form, brief: e.target.value })}
              required
              rows={3}
              style={inputStyle}
            />
            <input
              placeholder="Контакты (Telegram, Discord)"
              value={form.contacts}
              onChange={(e) => setForm({ ...form, contacts: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Цена (₽)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="datetime-local"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              required
              style={inputStyle}
            />
            <button type="submit" className="btn btn-primary">Создать заказ</button>
          </form>
        </section>
      )}

      <section className="prices" style={{ maxWidth: "1200px" }}>
        {orders.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Заказов нет</p>
        ) : (
          <div className="price-card" style={{ overflowX: "auto", padding: "1rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={thStyle}>Ник</th>
                  <th style={thStyle}>ТЗ</th>
                  <th style={thStyle}>Контакты</th>
                  <th style={thStyle}>Цена</th>
                  <th style={thStyle}>Дедлайн</th>
                  <th style={thStyle}>Статус</th>
                  <th style={thStyle}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={tdStyle}>{order.nickname}</td>
                    <td style={tdStyle}>{order.brief}</td>
                    <td style={tdStyle}>{order.contacts}</td>
                    <td style={tdStyle}>{order.price.toLocaleString("ru-RU")} ₽</td>
                    <td style={tdStyle}>
                      <Deadline deadline={order.deadline} createdAt={order.createdAt} status={order.status as any} />
                    </td>
                    <td style={tdStyle}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={inputStyle}
                      >
                        <option value="IN_PROGRESS">🔄 В работе</option>
                        <option value="DONE">✅ Выполнен</option>
                        <option value="CANCELLED">❌ Отменён</option>
                      </select>
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handleDelete(order.id)}
                        style={{
                          background: "rgba(239,68,68,0.15)",
                          border: "1px solid #f87171",
                          color: "#f87171",
                          padding: "0.4rem 0.8rem",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        🗑
                      </button>
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

const inputStyle: React.CSSProperties = {
  padding: "0.8rem 1rem",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  color: "var(--text)",
  fontSize: "1rem",
  width: "100%",
};

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
