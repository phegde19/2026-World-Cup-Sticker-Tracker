import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import stickers from "../data/stickers.json";
import { db } from "../db/db";

export default function Countries() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    const collection =
      await db.collection.toArray();

    const quantityMap = {};

    collection.forEach((item) => {
      quantityMap[item.code] =
        item.quantity;
    });

    const countries =
      [...new Set(
        stickers.map(
          (s) => s.Country
        )
      )];

    const progressMap = {};

    countries.forEach((country) => {

      const countryStickers =
        stickers.filter(
          (s) =>
            s.Country === country
        );

      const owned =
        countryStickers.filter(
          (sticker) =>
            (quantityMap[
              sticker.Code
            ] || 0) > 0
        ).length;

      progressMap[country] = {
        owned,
        total:
          countryStickers.length
      };
    });

    setProgress(progressMap);
  }

  const countries =
    Object.keys(progress).sort(
      (a, b) => {

        const aPct =
          progress[a].owned /
          progress[a].total;

        const bPct =
          progress[b].owned /
          progress[b].total;

        return bPct - aPct;
      }
    );

  return (
    <div className="page">

      <h1>🌎 Countries</h1>

      {countries.map((country) => {

        const percentage =
          (
            (progress[country].owned /
              progress[country].total) *
            100
          ).toFixed(0);

        return (
          <Link
            key={country}
            to={`/country/${encodeURIComponent(country)}`}
            style={{
              textDecoration:
                "none",
              color: "inherit"
            }}
          >
            <div className="card">

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between"
                }}
              >
                <strong>
                  {country}
                </strong>

                <strong>
                  {percentage}%
                </strong>
              </div>

              <div
                style={{
                  marginTop: "8px"
                }}
              >
                {
                  progress[country]
                    .owned
                }
                {" / "}
                {
                  progress[country]
                    .total
                }
              </div>

              <progress
                value={
                  progress[country]
                    .owned
                }
                max={
                  progress[country]
                    .total
                }
                style={{
                  width: "100%",
                  marginTop: "8px"
                }}
              />

            </div>
          </Link>
        );
      })}
    </div>
  );
}