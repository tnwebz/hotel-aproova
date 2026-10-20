const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const dir = path.join(__dirname, '../public/menu-images/main-course');
  const webpFiles = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
  const jpgFiles = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') && !f.includes('(1)'));

  console.log(`Comparing ${webpFiles.length} WEBPs with ${jpgFiles.length} JPGs...`);

  // Compute 16x16 grayscale buffer for each
  async function getFingerprint(filePath) {
    return await sharp(filePath)
      .resize(16, 16, { fit: 'fill' })
      .grayscale()
      .raw()
      .toBuffer();
  }

  const webpFingerprints = [];
  for (const w of webpFiles) {
    const fp = await getFingerprint(path.join(dir, w));
    webpFingerprints.push({ name: w, fp });
  }

  const jpgFingerprints = [];
  for (const j of jpgFiles) {
    const fp = await getFingerprint(path.join(dir, j));
    jpgFingerprints.push({ name: j, fp });
  }

  function diff(b1, b2) {
    let sum = 0;
    for (let i = 0; i < b1.length; i++) {
      sum += Math.abs(b1[i] - b2[i]);
    }
    return sum;
  }

  const matches = {};
  for (const w of webpFingerprints) {
    let bestJpg = null;
    let minDiff = Infinity;
    for (const j of jpgFingerprints) {
      const d = diff(w.fp, j.fp);
      if (d < minDiff) {
        minDiff = d;
        bestJpg = j.name;
      }
    }
    matches[w.name] = { bestJpg, minDiff };
    console.log(`${w.name} -> ${bestJpg} (diff: ${minDiff})`);
  }
}

main().catch(console.error);
