/**
 * This script compares two CSV files and adds the taxonId from the second file to the first file.
 */

import {loadCSV, saveCSV} from "./file.mjs";

const salzburg = loadCSV(
  "./files/Tieroekologie-Zertifikat_250-Arten-Salzburg_Artenliste_raw.csv"
);
const tirol = loadCSV(
  "./files/Tieroekologie-Zertifikat_250-Arten-Tirols_Version-5_Artenliste.csv"
);

for (let i = 0; i < salzburg.length; i++) {
  const s = salzburg[i];
  const exists = tirol.find((t) => t.scientificName === s.scientificName);
  if (!exists) {
    console.log("Taxon ID not found in Tirol: ", s.scientificName);
  } else {
    s.taxonId = exists.taxonId;
  }
}

saveCSV(
  "./files/Tieroekologie-Zertifikat_250-Arten-Salzburg_Artenliste.csv",
  salzburg
);
