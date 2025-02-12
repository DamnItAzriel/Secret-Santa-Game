# Secret Santa Generator

This project is a **Secret Santa Generator** built using **Node.js**. It reads employee data from a CSV file, matches employees with their "Secret Children," and avoids matching employees to the same person as the previous year. The result is saved to a new CSV file.

## Project Structure

```
.
├── CsvReader.js            # Class to read and map CSV data
├── CsvWriter.js            # Class to write data to a CSV file
├── SecretSantaGenerator.js # Class to generate the Secret Santa list
├── main.js                 # Main entry point for the application
├── employee_data.csv       # Sample employee data file
├── secretSanta2024.csv     # Sample Secret Santa list from last year
└── secretSanta2025.csv     # Output file for the generated Secret Santa list
```

---

## Prerequisites

Before running the program, ensure you have the following installed:

- **Node.js** (version 14 or later)
- **npm** (comes with Node.js)

---

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd secret-santa-generator
   ```

2. **Install Node.js** (if not already installed). Visit [Node.js Official Website](https://nodejs.org) for installation instructions.

---

## Usage Instructions

### 1. Prepare CSV Files
- **employee_data.csv**: A CSV file containing a list of employees. The first row should be headers, with columns like `Employee_Name` and `Employee_EmailID`.
- **secretSanta2024.csv**: A CSV file containing last year's Secret Santa assignments. Ensure it follows a similar format with columns like `Employee_EmailID` and `Secret_Child_EmailID`.

### 2. Run the Program
```bash
node main.js
```

### 3. Check the Output
The output will be saved in `secretSanta2025.csv` with the new Secret Santa assignments.

---

## Sample Data Format

**employee_data.csv:**

```csv
Employee_Name,Employee_EmailID
John Doe,john.doe@example.com
Jane Smith,jane.smith@example.com
Bob Johnson,bob.johnson@example.com
```

**secretSanta2024.csv:**

```csv
Employee_EmailID,Secret_Child_EmailID
john.doe@example.com,jane.smith@example.com
jane.smith@example.com,bob.johnson@example.com
bob.johnson@example.com,john.doe@example.com
```

---

## Code Explanation

### 1. `CsvReader.js`
- Reads CSV data from a file.
- Converts the data to an array of objects with keys based on the header row.

### 2. `CsvWriter.js`
- Writes an array of objects to a CSV file.
- Ensures headers are preserved and data is properly formatted.

### 3. `SecretSantaGenerator.js`
- Takes the employee data and last year's assignments as inputs.
- Randomly assigns a "Secret Child" to each employee, ensuring:
  - No one is assigned to themselves.
  - No one is assigned the same person as last year.

### 4. `main.js`
- Orchestrates the entire process by:
  - Reading employee and last-year data.
  - Generating the Secret Santa list.
  - Writing the result to a new CSV file.

---

## Error Handling
- **File Reading Errors:** Logs errors if files are missing or cannot be read.
- **Empty Data Handling:** Logs errors if the input data is empty or improperly formatted.
- **No Valid Secret Child:** Logs an error if no valid match is found for an employee.

---

## Customization
You can modify the CSV files or extend the code to add new rules for Secret Santa assignments.

---

## License
This project is licensed under the MIT License.

---

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to enhance the functionality or fix bugs.

---

## Contact
For any questions or issues, please contact [Pankaj Pawar/7pankaj.pawar@gmail.com].

