export default function StickerCard({
  sticker,
  quantity,
  parallelOnly,
  toggleParallel,
  updateQuantity
}) {

  let status = "🔴 Need";
  let background = "#ef4444";

  if (
    quantity > 0 &&
    !parallelOnly
  ) {
    status =
      quantity > 1
        ? "🔵 Duplicate"
        : "🟢 Have";

    background =
      quantity > 1
        ? "#2563eb"
        : "#16a34a";
  }

  if (
    quantity > 0 &&
    parallelOnly
  ) {
    status =
      "🟠 Parallel Only";

    background =
      "#f59e0b";
  }

  const teamCode =
    sticker.Code.replace(
      /[0-9]/g,
      ""
    );

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
          marginTop: "12px"
        }}
      >
        <label
          style={{
            fontWeight: "bold"
          }}
        >
          <input
            type="checkbox"
            checked={
              parallelOnly
            }
            onChange={() =>
              toggleParallel(
                sticker.Code
              )
            }
          />

          {" "}
          Parallel Only
        </label>
      </div>

      <div
        style={{
          marginTop: "12px",
          display: "inline-block",
          background,
          color: "white",
          padding: "6px 12px",
          borderRadius: "999px",
          fontWeight: "bold"
        }}
      >
        {status}
      </div>

    </div>
  );
}