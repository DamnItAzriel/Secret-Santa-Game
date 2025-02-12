class SecretSantaGenerator {
  constructor(employeeData, lastYearData) {
    this.employeeData = employeeData;
    this.lastYearData = lastYearData;
  }

  generateSecretSantaList() {
    const newSecretSantaList = [];
    for (let i = 0; i < this.employeeData.length; i++) {
      const currentEmployee = this.employeeData[i];
      const lastYearSanta = this.lastYearData.find(
        (santa) => santa.Employee_EmailID === currentEmployee.Employee_EmailID
      );
      const lastYearSecretChild = lastYearSanta ? lastYearSanta.Secret_Child_EmailID : null;

      const potentialSecretChildren = this.employeeData.filter(
        (employee) =>
          employee.Employee_EmailID !== currentEmployee.Employee_EmailID &&
          employee.Employee_EmailID !== lastYearSecretChild &&
          !newSecretSantaList.some((santa) => santa.Secret_Child_EmailID === employee.Employee_EmailID)
      );

      if (potentialSecretChildren.length === 0) {
        console.error(`No valid Secret Child found for ${currentEmployee.Employee_Name}`);
        continue;
      }

      const thisYearSecretChild =
        potentialSecretChildren[Math.floor(Math.random() * potentialSecretChildren.length)];

      newSecretSantaList.push({
        Employee_Name: currentEmployee.Employee_Name,
        Employee_EmailID: currentEmployee.Employee_EmailID,
        Secret_Child_Name: thisYearSecretChild.Employee_Name,
        Secret_Child_EmailID: thisYearSecretChild.Employee_EmailID,
      });
    }
    return newSecretSantaList;
  }
}

module.exports = SecretSantaGenerator;
