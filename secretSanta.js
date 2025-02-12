const fs = require("fs").promises;
const employeeDataFileName = "employee_data.csv";
const lastYearFileName = "secretSanta2024.csv";
const secretSantaThisYearFileName = 'secretSanta2025.csv';
async function main() {
  const lastYearSecretSantaData = await readCsv(lastYearFileName) || [];
  const employeeData = await readCsv(employeeDataFileName) || [];
  const secretSantaList = createSecretSantaList(employeeData, lastYearSecretSantaData);
  writeCsvFile(secretSantaThisYearFileName, secretSantaList);
}
async function readCsv(fileName) {
  try {
    const data = await fs.readFile(fileName, "utf-8");
    const rows = data.split("\n");
    const dataArray = rows.map((row) => row.split(","));
    return createMapping(dataArray);
  } catch(err) {
    console.error(`Error reading the file ${fileName}:`, err.message);
    return;
  }

}

function createMapping(employeeDataArray) {
  const mappingArray = [];
  for (let employee_detail = 1; employee_detail < employeeDataArray.length; employee_detail++) {
    let mapObject = {};
    for (let header = 0; header < employeeDataArray[0].length; header++) {
      let header_key = employeeDataArray[0][header];
      if(employeeDataArray[employee_detail][header]) {
        mapObject[header_key] = employeeDataArray[employee_detail][header]; 
      }
    }
    if(Object.keys(mapObject).length) {
      mappingArray.push(mapObject);
    }
  }
  return mappingArray;
}

function createSecretSantaList(employeeData, lastYearSecretSantaData) {
  const newSecretSantaList = [];
  for (let i = 0; i < employeeData.length; i++) {
    const currentEmployee = employeeData[i];
    const lastYearSanta = lastYearSecretSantaData.find(
      (santa) => santa.Employee_EmailID === currentEmployee.Employee_EmailID
    );
    const lastYearSecretChild = lastYearSanta ? lastYearSanta.Secret_Child_EmailID : null;
    const potentialSecretChildren = employeeData.filter(
      (employee) =>
        employee.Employee_EmailID !== currentEmployee.Employee_EmailID &&
        employee.Employee_EmailID !== lastYearSecretChild &&
        !newSecretSantaList.some((santa) => santa.Secret_Child_EmailID === employee.Employee_EmailID)
    );
    if (potentialSecretChildren.length === 0) {
      console.error(`No valid Secret Child found for ${currentEmployee.Employee_Name}`);
      continue;
    }
    const thisYearSecretChild = potentialSecretChildren[Math.floor(Math.random() * potentialSecretChildren.length)];
    newSecretSantaList.push({
      Employee_Name: currentEmployee.Employee_Name,
      Employee_EmailID: currentEmployee.Employee_EmailID,
      Secret_Child_Name: thisYearSecretChild.Employee_Name,
      Secret_Child_EmailID: thisYearSecretChild.Employee_EmailID,
    });
  }
  return newSecretSantaList;
}
async function writeCsvFile(fileName, data) {
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
    await fs.writeFile(fileName, csvContent, "utf-8");
    console.log(`CSV file "${fileName}" has been created successfully.`);
  } catch (err) {
    console.error(`Error writing to file "${fileName}":`, err.message);
  }
}

main()