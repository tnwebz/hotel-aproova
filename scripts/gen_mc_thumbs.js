const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Let's create small 400x300 thumbnails for all 52 unique JPGs in public/mc_thumbs/
const dir = path.join(__dirname, '../public/menu-images/main-course');
const outDir = path.join(__dirname, '../public/mc_thumbs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') && !f.includes('(1)'));

async function processThumbs() {
  for (const f of files) {
    const outFile = path.join(outDir, f.replace('.jpg', '.webp'));
    if (!fs.existsSync(outFile)) {
      await sharp(path.join(dir, f))
        .resize(480, 320, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(outFile);
    }
  }
  console.log('Generated thumbnails for all 52 JPGs');
}

processThumbs().catch(console.error);
