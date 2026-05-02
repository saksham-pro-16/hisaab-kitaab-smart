const xlsx = require('xlsx');

const workbook = xlsx.readFile('retail_sales_bills.xlsx');
console.log("Sheet names:", workbook.SheetNames);

for (const name of workbook.SheetNames) {
  const sheet = workbook.Sheets[name];
  const data = xlsx.utils.sheet_to_json(sheet);
  console.log(`\nSheet: ${name}, Rows: ${data.length}`);
  if (data.length > 0) {
    console.log("Row 0:", data[0]);
    if (data.length > 1) {
       console.log("Row 1:", data[1]);
       console.log("Row 2:", data[2]);
    }
  }
}
