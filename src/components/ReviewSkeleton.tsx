export default function ReviewSkeleton() {
  return (
    <div
      className="price-card"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div className="skeleton skeleton-avatar" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div className="skeleton skeleton-text" style={{ width: "40%" }} />
          <div className="skeleton skeleton-text" style={{ width: "25%" }} />
        </div>
      </div>
      <div className="skeleton skeleton-text" style={{ width: "100%" }} />
      <div className="skeleton skeleton-text" style={{ width: "90%" }} />
      <div className="skeleton skeleton-text" style={{ width: "70%" }} />
    </div>
  );
}