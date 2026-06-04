export default function Stats({
  total,
  owned,
  missing,
  extraCopies,
  completion
}) {
  return (
    <>
      <div
        className="card"
        style={{
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            margin: "0"
          }}
        >
          {completion}%
        </h1>

        <p
          style={{
            fontSize: "18px",
            marginTop: "10px"
          }}
        >
          🏆 Album Complete
        </p>

        <progress
          value={owned}
          max={total}
          style={{
            width: "100%",
            marginTop: "10px"
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px"
        }}
      >
        <div
          className="card"
          style={{
            textAlign: "center"
          }}
        >
          <h3>Owned</h3>
          <h1>{owned}</h1>
        </div>

        <div
          className="card"
          style={{
            textAlign: "center"
          }}
        >
          <h3>Missing</h3>
          <h1>{missing}</h1>
        </div>
      </div>

      <div
        className="card"
        style={{
          textAlign: "center"
        }}
      >
        <h3>📦 Tradeable Extras</h3>
        <h1>{extraCopies}</h1>
      </div>

      <div
        className="card"
        style={{
          textAlign: "center"
        }}
      >
        <h3>⚽ Total Stickers</h3>
        <h1>{total}</h1>
      </div>
    </>
  );
}