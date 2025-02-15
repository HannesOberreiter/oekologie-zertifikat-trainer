import {loadCSV, saveCSV} from "./file.mjs";
const url = "https://api.inaturalist.org/v2";
const searchQuery = "/taxa?rank=species&q=";

const file = "./files/Tieroekologie-Zertifikat_250-Arten-Salzburg_Artenliste.csv";

function getId(scientificName) {
  return fetch(url + searchQuery + scientificName)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length === 0) {
        return null;
      }
      return data.results[0].id;
    });
}

const salzburg = loadCSV(file);

for (let i = 0; i < salzburg.length; i++) {
  const s = salzburg[i];
  if (s.taxonId && s.taxonId !== "0" || s.scientificName === "") {
    continue;
  }
  console.log("Fetching taxon ID for: ", s.scientificName);
  await getId(s.scientificName).then((id) => {
    if (!id) {
      console.log("Taxon ID not found in iNaturalist: ", s.scientificName);
    } else {
      s.taxonId = id;
    }
  });
}

saveCSV(file, salzburg);