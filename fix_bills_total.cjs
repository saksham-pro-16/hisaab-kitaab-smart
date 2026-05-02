const fs = require('fs');

const mockDataPath = 'src/lib/mockData.ts';
let content = fs.readFileSync(mockDataPath, 'utf8');

// Match the initialBills array
const billsRegex = /const initialBills: Bill\[\] = (\[[\s\S]*?\]);/;
const match = content.match(billsRegex);

if (match) {
  // Evaluate the array
  // Wait, evaluating TS code containing emojis and stuff is tricky but possible if we strip types, or we can just use regex.
  // Actually we can parse it as JS since it's just an array of objects.
  let billsStr = match[1];
  
  // A safe way to calculate is using regex to find items and then replace the totals line.
  
  // We can just execute the array using eval after a small replacement.
  const evalStr = "return " + billsStr;
  const initialBills = new Function(evalStr)();
  
  for (const bill of initialBills) {
    let subtotal = 0;
    for (const item of bill.items) {
      subtotal += item.price * item.qty;
    }
    bill.subtotal = subtotal;
    bill.gst = Math.round(subtotal * 0.05); // let's say 5%
    bill.discount = 0;
    bill.total = bill.subtotal + bill.gst - bill.discount;
  }
  
  let newBillsStr = '[\n';
  for (const b of initialBills) {
    newBillsStr += `  {
    id: "${b.id}",
    date: "${b.date}",
    items: [\n`;
    for (const it of b.items) {
      newBillsStr += `      { productId: "${it.productId}", name: "${it.name}", emoji: "${it.emoji}", price: ${it.price}, qty: ${it.qty} },\n`;
    }
    newBillsStr += `    ],
    subtotal: ${b.subtotal}, gst: ${b.gst}, discount: ${b.discount}, total: ${b.total},
  },\n`;
  }
  newBillsStr += ']';
  
  content = content.replace(billsRegex, `const initialBills: Bill[] = ${newBillsStr};`);
  fs.writeFileSync(mockDataPath, content);
  console.log('Fixed totals');
} else {
  console.log('Could not find initialBills');
}
