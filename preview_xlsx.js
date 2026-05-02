const xlsx = require('xlsx');

const workbook = xlsx.readFile('retail_sales_bills.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

console.log("Headers/Keys of first row:", Object.keys(data[0]));
console.log("First row data:", data[0]);
console.log("Total rows:", data.length);
