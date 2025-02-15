import fs from "fs";

function loadCSV(path) {
  const taxa = [];
  console.log("Loading file: ", path);
  const text = fs.readFileSync(path, "utf8");
  const lines = text.split(/\r?\n/);
  for (let i = 1; i < lines.length; i++) {
    const [scientificName, commonName, _class, order, family, taxonId] =
      lines[i].split(";");
    taxa.push({
      scientificName,
      commonName,
      class: _class,
      order,
      family: family,
      taxonId: taxonId,
    });
  }
  return taxa;
}

function saveCSV(path, data) {
  fs.writeFileSync(path, "scientificName;commonName;class;order;family;taxonId\n");
  for (let i = 0; i < data.length; i++) {
    const s = data[i];
    if(!s.scientificName){
      continue;
    }
    fs.appendFileSync(
      path,
      `${s.scientificName};${s.commonName};${s.class};${s.order};${s.family};${s.taxonId}\n`
    );
  }
}

export {
  loadCSV, saveCSV
}