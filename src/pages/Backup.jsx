import { db } from "../db/db";

export default function Backup() {

  async function exportCollection() {

    const collection =
      await db.collection.toArray();

    const data = JSON.stringify(
      collection,
      null,
      2
    );

    const blob = new Blob(
      [data],
      {
        type:
          "application/json"
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "world-cup-backup.json";

    link.click();

    URL.revokeObjectURL(url);
  }

  async function importCollection(
    event
  ) {

    const file =
      event.target.files[0];

    if (!file) return;

    const text =
      await file.text();

    const collection =
      JSON.parse(text);

    await db.collection.clear();

    await db.collection.bulkPut(
      collection
    );

    alert(
      "Collection imported successfully!"
    );
  }

  return (
    <div>
      <h1>Backup</h1>

      <button
        onClick={
          exportCollection
        }
      >
        Export Collection
      </button>

      <br />
      <br />

      <input
        type="file"
        accept=".json"
        onChange={
          importCollection
        }
      />
    </div>
  );
}