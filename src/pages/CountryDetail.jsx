import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import stickers from "../data/stickers.json";
import { db } from "../db/db";

import StickerCard from "../components/StickerCard";

export default function CountryDetail() {

  const { country } =
    useParams();

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

    if (qty < 0)
      qty = 0;

    await db.collection.put({
      code,
      quantity: qty
    });

    loadCollection();
  }

  const countryStickers =
    stickers.filter(
      (sticker) =>
        sticker.Country ===
        country
    );

  const owned =
    countryStickers.filter(
      (sticker) =>
        (quantities[
          sticker.Code
        ] || 0) > 0
    ).length;

  const percentage =
    (
      (owned /
        countryStickers.length) *
      100
    ).toFixed(0);

  return (
    <div className="page">

      <div className="card">

        <h1>{country}</h1>

        <h2>
          {percentage}% Complete
        </h2>

        <p>
          {owned}
          {" / "}
          {
            countryStickers.length
          }
        </p>

        <progress
          value={owned}
          max={
            countryStickers.length
          }
          style={{
            width: "100%"
          }}
        />

      </div>

      {countryStickers.map(
        (sticker) => (
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
        )
      )}

    </div>
  );
}