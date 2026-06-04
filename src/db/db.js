import Dexie from "dexie";

export const db = new Dexie("WorldCupTracker");

db.version(1).stores({
  collection: "code, quantity"
});