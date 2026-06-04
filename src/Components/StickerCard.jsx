export default function StickerCard({
  sticker,
  quantity,
  updateQuantity
}) {

  let status = "🔴 Need";
  let background = "#ef4444";

  if (quantity === 1) {
    status = "🟢 Have";
    background = "#16a34a";
  }

  if (quantity > 1) {
    status = "🔵 Duplicate";
    background = "#2563eb";
  }

  const teamCode =
    sticker.Code.replace(/[0-9]/g, "");

  return (
    <div className="card">

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px"
        }}
      >
        <span
          style={{
            background: "#2563eb",
            color: "white",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: "bold"
          }}
        >
          {teamCode}
        </span>

        <h3
          style={{
            margin: 0
          }}
        >
          {sticker.Code}
        </h3>
      </div>

      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        {sticker.Name}
      </div>

      <div
        style={{
          color: "#6b7280",
          marginTop: "4px"
        }}
      >
        {sticker.Country}
      </div>

      <div
        style={{
          marginTop: "12px",
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        Quantity: {quantity}
      </div>

      <div className="button-row">

        <button
          className="quantity-btn"
          onClick={() =>
            updateQuantity(
              sticker.Code,
              quantity - 1
            )
          }
        >
          ➖
        </button>

        <button
          className="quantity-btn"
          onClick={() =>
            updateQuantity(
              sticker.Code,
              quantity + 1
            )
          }
        >
          ➕
        </button>

      </div>

      <div
        style={{
          marginTop: "12px",
          fontWeight: "bold"
        }}
      >
        {status}
      </div>

    </div>
  );
}