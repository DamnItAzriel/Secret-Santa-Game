const fs = require("fs").promises;

class CsvWriter {
  constructor(fileName) {
    this.fileName = fileName;
  }
  async writeCsv(data) {
    if (data.length === 0) {
      console.error("Data is empty. Cannot write to CSV.");
      return;
    }
    const headers = Object.keys(data[0]);
    let csvContent = headers.join(",") + "\n";
    data.forEach((row) => {
      const rowValues = headers.map((header) => row[header]);
      csvContent += rowValues.join(",") + "\n";
    });
    try {
      await fs.writeFile(this.fileName, csvContent, "utf-8");
      console.log(`CSV file "${this.fileName}" has been created successfully.`);
    } catch (err) {
      console.error(`Error writing to file "${this.fileName}":`, err.message);
    }
  }
}

module.exports = CsvWriter;
