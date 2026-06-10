import { useEffect, useState } from "react";
import stickers from "../data/stickers.json";
import { db } from "../db/db";
import ThemeToggle from "../Components/ThemeToggle";

import Stats from "../components/Stats";

export default function Dashboard() {

  const [stats, setStats] =
    useState({
      owned: 0,
      missing: 0,
      extraCopies: 0,
      total: stickers.length
    });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {

    const collection =
      await db.collection.toArray();

    let owned = 0;
    let extraCopies = 0;

    collection.forEach((item) => {

      if (
        item.quantity > 0 &&
        !item.parallelOnly
      ) {
        owned++;
      }

      if (item.quantity > 1) {
        extraCopies +=
          item.quantity - 1;
      }

    });

    setStats({
      total: stickers.length,
      owned,
      extraCopies,
      missing:
        stickers.length - owned
    });
  }

  const completion =
    (
      (stats.owned /
        stats.total) *
      100
    ).toFixed(1);

  return (
    <div className="page">

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center"
        }}
      >
        <h1>
          📊 Dashboard
        </h1>

        <ThemeToggle />
      </div>

      <Stats
        total={stats.total}
        owned={stats.owned}
        missing={stats.missing}
        extraCopies={
          stats.extraCopies
        }
        completion={
          completion
        }
      />

    </div>
  );
}