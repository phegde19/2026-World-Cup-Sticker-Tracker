import { useEffect, useState } from "react";
import stickers from "../data/stickers.json";
import { db } from "../db/db";

export default function Duplicates() {
  const [duplicates, setDuplicates] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const collection = await db.collection.toArray();

    const dupes = collection.filter(
      item => item.quantity > 1
    );

    const result = dupes.map(item => {
      const sticker =
        stickers.find(
          s => s.Code === item.code
        );

      return {
        ...sticker,
        quantity: item.quantity
      };
    });

    setDuplicates(result);
  }

  return (
    <div>
      <h1>Duplicates</h1>

      {duplicates.map(sticker => (
        <div key={sticker.Code}>
          {sticker.Code}
          {" - "}
          {sticker.Name}
          {" (x"}
          {sticker.quantity}
          {")"}
        </div>
      ))}
    </div>
  );
}