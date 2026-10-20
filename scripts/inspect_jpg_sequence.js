const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dir = path.join(__dirname, '../public/menu-images/main-course');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') && !f.includes('(1)'));

const items = files.map(f => {
  const stat = fs.statSync(path.join(dir, f));
  return { name: f, time: stat.mtimeMs, date: stat.mtime.toISOString(), size: stat.size };
});

items.sort((a, b) => a.time - b.time);

items.forEach((item, idx) => {
  console.log(`${idx + 1}: ${item.name} (${item.date})`);
});
