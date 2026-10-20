const fs = require('fs');
const content = fs.readFileSync('Hotel_Apoorvaa_306_Menu_Items.csv', 'utf8');
const lines = content.split('\n').filter(l => l.includes(',"Main Course",'));
lines.slice(0, 20).forEach((l, i) => console.log(i + 1, l.trim()));
