import Dexie from "dexie";

export const db =
  new Dexie(
    "WorldCupTracker"
  );

db.version(2).stores({
  collection:
    "code, quantity, parallelOnly"
});