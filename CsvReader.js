const fs = require("fs").promises;

class CsvReader {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async readCsv() {
    try {
      const data = await fs.readFile(this.fileName, "utf8");
      const rows = data.split("\n");
      const dataArray = rows.map((row) => row.split(","));
      return this.createMapping(dataArray);
    } catch (err) {
      console.error(`Error reading the file ${this.fileName}:`, err.message);
      return [];
    }
  }

  createMapping(dataArray) {
    const mappingArray = [];
    for (let i = 1; i < dataArray.length; i++) {
      let mapObject = {};
      for (let j = 0; j < dataArray[0].length; j++) {
        const header = dataArray[0][j];
        if (dataArray[i][j]) {
          mapObject[header] = dataArray[i][j];
        }
      }
      if (Object.keys(mapObject).length > 0) {
        mappingArray.push(mapObject);
      }
    }
    return mappingArray;
  }
}

module.exports = CsvReader;
