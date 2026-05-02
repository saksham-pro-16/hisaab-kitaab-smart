const xlsx = require('xlsx');

const workbook = xlsx.readFile('retail_sales_bills.xlsx');
const sheet = workbook.Sheets['Bill 1'];
const data = xlsx.utils.sheet_to_json(sheet, {header: 1});

console.log(data);
