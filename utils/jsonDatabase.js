const fs = require("fs");
const path = require("path");

// A pasta data fica na raiz do projeto.
const dataDirectory = path.join(__dirname, "..", "data");

function readData(fileName) {
  const filePath = path.join(dataDirectory, fileName);

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
    fs.writeFileSync(filePath, "[]", "utf8");
  }

  const content = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(content || "[]");

  if (!Array.isArray(data)) {
    throw new Error(`O arquivo ${fileName} precisa conter uma lista JSON.`);
  }

  return data;
}

function writeData(fileName, data) {
  const filePath = path.join(dataDirectory, fileName);
  fs.mkdirSync(dataDirectory, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

module.exports = { readData, writeData };
