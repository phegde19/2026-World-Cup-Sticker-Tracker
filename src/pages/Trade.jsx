import { useEffect, useState } from "react";
import stickers from "../data/stickers.json";
import { db } from "../db/db";

export default function Trade() {

  const [needs, setNeeds] =
    useState([]);

  const [duplicates,
    setDuplicates] =
    useState([]);

  const [view, setView] =
    useState("needs");

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadTradeData();
  }, []);

  async function loadTradeData() {

    const collection =
      await db.collection.toArray();

    const quantityMap = {};

    collection.forEach((item) => {
      quantityMap[item.code] =
        item.quantity;
    });

    const missing =
      stickers.filter(
        (sticker) =>
          !quantityMap[
            sticker.Code
          ] ||
          quantityMap[
            sticker.Code
          ] === 0
      );

    const dupes =
      collection
        .filter(
          (item) =>
            item.quantity > 1
        )
        .map((item) => {

          const sticker =
            stickers.find(
              (s) =>
                s.Code ===
                item.code
            );

          return {
            ...sticker,
            quantity:
              item.quantity
          };
        });

    setNeeds(missing);
    setDuplicates(dupes);
  }

  const filteredNeeds =
    needs.filter((sticker) => {

      const term =
        search.toLowerCase();

      return (
        sticker.Code
          .toLowerCase()
          .includes(term) ||

        sticker.Name
          .toLowerCase()
          .includes(term) ||

        sticker.Country
          .toLowerCase()
          .includes(term)
      );
    });

  const filteredDuplicates =
    duplicates.filter(
      (sticker) => {

        const term =
          search.toLowerCase();

        return (
          sticker.Code
            .toLowerCase()
            .includes(term) ||

          sticker.Name
            .toLowerCase()
            .includes(term) ||

          sticker.Country
            .toLowerCase()
            .includes(term)
        );
      }
    );

  return (
    <div className="page">

      <h1>
        🤝 Trade Mode
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "12px",
          marginBottom: "20px"
        }}
      >
        <div
          className="card"
          style={{
            textAlign: "center"
          }}
        >
          <h3>Need</h3>
          <h1>{needs.length}</h1>
        </div>

        <div
          className="card"
          style={{
            textAlign: "center"
          }}
        >
          <h3>Extras</h3>
          <h1>
            {
              duplicates.reduce(
                (
                  total,
                  sticker
                ) =>
                  total +
                  (
                    sticker.quantity -
                    1
                  ),
                0
              )
            }
          </h1>
        </div>
      </div>

      <div
        className="trade-tabs"
      >
        <button
          className="trade-tab"
          onClick={() =>
            setView(
              "needs"
            )
          }
        >
          Need
        </button>

        <button
          className="trade-tab"
          onClick={() =>
            setView(
              "duplicates"
            )
          }
        >
          Extras
        </button>
      </div>

      <input
        className="search-input"
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      {view === "needs" &&

        filteredNeeds.map(
          (sticker) => (

            <div
              key={
                sticker.Code
              }
              className="card"
            >
              <strong>
                {
                  sticker.Code
                }
              </strong>

              <div>
                {
                  sticker.Name
                }
              </div>

              <div>
                {
                  sticker.Country
                }
              </div>
            </div>

          )
        )}

      {view ===
        "duplicates" &&

        filteredDuplicates.map(
          (sticker) => (

            <div
              key={
                sticker.Code
              }
              className="card"
            >
              <strong>
                {
                  sticker.Code
                }
              </strong>

              <div>
                {
                  sticker.Name
                }
              </div>

              <div>
                {
                  sticker.Country
                }
              </div>

              <div
                style={{
                  marginTop:
                    "8px",
                  fontWeight:
                    "bold"
                }}
              >
                Qty:
                {" "}
                {
                  sticker.quantity
                }
              </div>
            </div>

          )
        )}

    </div>
  );
}