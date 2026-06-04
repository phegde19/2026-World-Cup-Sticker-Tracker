import XLSX from "xlsx";
import fs from "fs";

const workbook = XLSX.readFile(
  "./data/world_cup_2026_stickers_with_country.xlsx"
);

const sheet =
  workbook.Sheets[workbook.SheetNames[0]];

const data =
  XLSX.utils.sheet_to_json(sheet);

fs.writeFileSync(
  "./src/data/stickers.json",
  JSON.stringify(data, null, 2)
);

console.log(
  `Generated ${data.length} stickers`
);