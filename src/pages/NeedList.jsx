import { useEffect, useState } from "react";
import stickers from "../data/stickers.json";
import { db } from "../db/db";

export default function NeedList() {
  const [need, setNeed] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const collection = await db.collection.toArray();

    const map = {};

    collection.forEach(item => {
      map[item.code] = item.quantity;
    });

    const missing = stickers.filter(
      s => !map[s.Code] || map[s.Code] === 0
    );

    setNeed(missing);
  }

  return (
    <div>
      <h1>Need List</h1>

      {need.map(sticker => (
        <div key={sticker.Code}>
          {sticker.Code} - {sticker.Name}
        </div>
      ))}
    </div>
  );
}