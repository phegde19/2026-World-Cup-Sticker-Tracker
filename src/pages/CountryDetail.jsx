import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import stickers from "../data/stickers.json";
import { db } from "../db/db";

import StickerCard from "../components/StickerCard";

export default function CountryDetail() {

  const { country } =
    useParams();

  const [collection,
    setCollection] =
    useState({});

  useEffect(() => {
    loadCollection();
  }, []);

  async function loadCollection() {

    const data =
      await db.collection.toArray();

    const map = {};

    data.forEach((item) => {

      map[item.code] = {
        quantity:
          item.quantity || 0,

        parallelOnly:
          item.parallelOnly ||
          false
      };

    });

    setCollection(map);
  }

  async function updateQuantity(
    code,
    qty
  ) {

    if (qty < 0)
      qty = 0;

    const existing =
      await db.collection.get(
        code
      );

    await db.collection.put({
      code,
      quantity: qty,
      parallelOnly:
        existing?.parallelOnly ||
        false
    });

    loadCollection();
  }

  async function toggleParallel(
    code
  ) {

    const existing =
      await db.collection.get(
        code
      );

    await db.collection.put({
      code,
      quantity:
        existing?.quantity || 0,
      parallelOnly:
        !existing?.parallelOnly
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
      (sticker) => {

        const record =
          collection[
            sticker.Code
          ];

        return (
          record &&
          record.quantity > 0 &&
          !record.parallelOnly
        );

      }
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
              collection[
                sticker.Code
              ]?.quantity || 0
            }
            parallelOnly={
              collection[
                sticker.Code
              ]?.parallelOnly || false
            }
            toggleParallel={
              toggleParallel
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