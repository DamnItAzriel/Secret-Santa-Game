const CsvReader = require("./CsvReader");
const CsvWriter = require("./CsvWriter");
const SecretSantaGenerator = require("./SecretSantaGenerator");

const employeeDataFileName = "employee_data.csv";
const lastYearFileName = "secretSanta2024.csv";
const secretSantaThisYearFileName = "secretSanta2025.csv";

async function main() {
  const employeeDataReader = new CsvReader(employeeDataFileName);
  const lastYearDataReader = new CsvReader(lastYearFileName);
  const employeeData = await employeeDataReader.readCsv();
  const lastYearData = await lastYearDataReader.readCsv();

  const secretSantaGenerator = new SecretSantaGenerator(employeeData, lastYearData);
  const secretSantaList = secretSantaGenerator.generateSecretSantaList();

  const csvWriter = new CsvWriter(secretSantaThisYearFileName);
  await csvWriter.writeCsv(secretSantaList);
}

main();
