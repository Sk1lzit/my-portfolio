"use client";

import { useEffect, useState } from "react";

interface Review {
  id: string;
  name: string;
  avatar: string | null;
  rating: number;
  text: string;
  createdAt: string;
}

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Загрузка отзывов...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
        Отзывов пока нет. Станьте первым!
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {reviews.map((review) => (
        <div className="price-card" key={review.id}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            {review.avatar && (
              <img
                src={review.avatar}
                alt={review.name}
                style={{ width: "48px", height: "48px", borderRadius: "50%" }}
              />
            )}
            <div>
              <div style={{ fontWeight: "bold", color: "var(--purple-light)" }}>{review.name}</div>
              <div style={{ color: "#fbbf24" }}>
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
          </div>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{review.text}</p>
        </div>
      ))}
    </div>
  );
}