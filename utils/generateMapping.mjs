import fs from "fs";
import path from "path";

const imagesFolder = path.resolve("./files/images");

const mapping = {};

const files = fs.readdirSync(imagesFolder, {recursive: true});

if (files.length === 0) {
  console.error("Error reading the images folder, no files found.");
}

files.forEach((file) => {
  if (!file.match(/\.(jpg|jpeg|png|gif)$/i)) return;

  const match = file.match(/([a-zA-Z\.]+)_([a-zA-Z]+)_\d+\.(jpg|jpeg|png|gif)$/);
  if (!match) return;
  const speciesName = match[1] + " " + match[2];

  if (!mapping[speciesName]) {
    mapping[speciesName] = [];
  }
  mapping[speciesName].push(file);
});

const outputFilePath = path.resolve("./files/mapping.json");
fs.writeFile(outputFilePath, JSON.stringify(mapping, null, 2), (err) => {
  if (err) {
    console.error("Error writing the mapping file:", err);
  } else {
    console.log("Mapping file generated successfully:", outputFilePath);
  }
});
