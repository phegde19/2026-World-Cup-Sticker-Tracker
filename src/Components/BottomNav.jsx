import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "12px",
        background: "#fff",
        borderTop: "1px solid #ccc",
        zIndex: 1000
      }}
    >
      <Link
        to="/"
        style={{ textDecoration: "none" }}
      >
        📊
      </Link>

      <Link
        to="/search"
        style={{ textDecoration: "none" }}
      >
        🔍
      </Link>

      <Link
        to="/trade"
        style={{ textDecoration: "none" }}
      >
        🤝
      </Link>

      <Link
        to="/countries"
        style={{ textDecoration: "none" }}
      >
        🌎
      </Link>

      <Link
        to="/backup"
        style={{ textDecoration: "none" }}
      >
        💾
      </Link>
    </div>
  );
}