import { useEffect, useState } from "react";

import stickers from "../data/stickers.json";
import { db } from "../db/db";

import SearchBar from "../components/SearchBar";
import StickerCard from "../components/StickerCard";

export default function Search() {

  const [search, setSearch] =
    useState("");

  const [quantities,
    setQuantities] =
    useState({});

  useEffect(() => {
    loadCollection();
  }, []);

  async function loadCollection() {

    const data =
      await db.collection.toArray();

    const map = {};

    data.forEach((item) => {
      map[item.code] =
        item.quantity;
    });

    setQuantities(map);
  }

  async function updateQuantity(
    code,
    qty
  ) {

    if (qty < 0) {
      qty = 0;
    }

    await db.collection.put({
      code,
      quantity: qty
    });

    loadCollection();
  }

  const filtered =
    search.trim() === ""
      ? []
      : stickers.filter(
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

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        <h1>
          ⚽ World Cup
        </h1>

        <h2>
          Sticker Tracker
        </h2>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {search.trim() !== "" && (

        <div
          style={{
            marginBottom: "12px",
            fontWeight: "bold"
          }}
        >
          {filtered.length}
          {" "}results found
        </div>

      )}

      {search.trim() === "" ? (

        <div className="card">

          <h2>
            ⚽ Welcome
          </h2>

          <p>
            Search by sticker
            code, player name,
            or country.
          </p>

          <p>
            <strong>
              {stickers.length}
            </strong>
            {" "}stickers loaded.
          </p>

          <div
            style={{
              marginTop: "12px"
            }}
          >
            Try searching:
          </div>

          <ul>
            <li>USA16</li>
            <li>Mbappe</li>
            <li>Brazil</li>
            <li>France</li>
          </ul>

        </div>

      ) : (

        filtered
          .slice(0, 50)
          .map((sticker) => (

            <StickerCard
              key={
                sticker.Code
              }
              sticker={sticker}
              quantity={
                quantities[
                  sticker.Code
                ] || 0
              }
              updateQuantity={
                updateQuantity
              }
            />

          ))

      )}

    </div>
  );
}