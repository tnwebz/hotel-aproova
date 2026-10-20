const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/menu-images/main-course');
const allJpgs = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') && !f.includes('(1)'));

// Current confirmed matches
const confirmed = {
  // Mughlai
  'image_20261018_084405_2.jpg': 'mughlai-paneer',
  'image_20261018_084405_1.jpg': 'mughlai-mushroom',
  'image_20261018_084407.jpg': 'mughlai-gobi',
  'image_20261018_084405.jpg': 'mughlai-babycorn',

  // Monika
  'image_20261018_084406_1.jpg': 'monika-paneer', // has tag "Monika Special Paneer"
  'image_20261018_084409.jpg': 'monika-mushroom', // has card "Monika Special Mushroom Curry"
  'image_20261018_084413.jpg': 'monika-gobi', // has card "Monika Special Gobi Curry"
  'image_20261018_084407_1.jpg': 'monika-babycorn', // has card "Monika Special Babycorn Curry"

  // Sizzler & Kadai Veg
  'image_20261018_084419.jpg': 'paneer-sizzler',
  'image_20261018_084406.jpg': 'kadaai-veg',

  // Kadai
  'image_20261018_084507_1.jpg': 'kadaai-paneer',
  'image_20261018_084508.jpg': 'kadaai-mushroom',
  'image_20261018_084505.jpg': 'kadaai-gobi',
  'image_20261018_084508_1.jpg': 'kadaai-babycorn',

  // Chettinad
  'image_20261018_084508_2.jpg': 'paneer-chettinad',
  'image_20261018_084506.jpg': 'mushroom-chettinad',
  'image_20261018_084516.jpg': 'babycorn-chettinad',
  // where is gobi-chettinad?

  // Tikka Masala
  'image_20261018_085000.jpg': 'paneer-tikka-masala',
  'image_20261018_085020.jpg': 'mushroom-tikka-masala',

  // Pallipalayam
  'image_20261018_085004.jpg': 'paneer-pallipalayam',
  'image_20261018_085009.jpg': 'mushroom-pallipalayam',
  'image_20261018_085015.jpg': 'gobi-pallipalayam',
  'image_20261018_085017.jpg': 'babycorn-pallipalayam',

  // Methi
  'image_20261018_085012.jpg': 'paneer-methi', // has tag "Paneer Methi - Apoorva Special"
  'image_20261018_085000_2.jpg': 'mushroom-methi', // has tag "Mushroom Methi - Apoorva Special"
  'image_20261018_085010.jpg': 'gobi-methi', // has tag "Gobi Methi - Apoorva Special"

  // Maharani Dry
  'image_20261018_085001.jpg': 'paneer-maharani-dry',
  'image_20261018_085000_1.jpg': 'mushroom-maharani-dry',
  'image_20261018_084512.jpg': 'gobi-maharani-dry',
  'image_20261018_084507.jpg': 'babycorn-maharani-dry',

  // Chinthamani
  'image_20261018_084905_1.jpg': 'mushroom-chinthamani',
  'image_20261018_084854.jpg': 'gobi-chithamani',
  'image_20261018_084857.jpg': 'babycorn-chithamani',

  // Butter Masala
  'image_20261018_084630.jpg': 'paneer-butter-masala',

  // Hariyali
  'image_20261018_084631.jpg': 'paneer-hariyali',
  'image_20261018_084632.jpg': 'mushroom-hariyali',
  'image_20261018_084633.jpg': 'gobi-hariyali',
  'image_20261018_084634_1.jpg': 'babycorn-hariyali',

  // Hyderabad Gravy
  'image_20261018_084634.jpg': 'paneer-hyderabad-gravy',
  'image_20261018_084639.jpg': 'mushroom-hyderabad-gravy',
  'image_20261018_084640.jpg': 'gobi-hyderabad-gravy',
  'image_20261018_084641.jpg': 'babycorn-hyderabad-gravy',

  // Mutter Rogan Gravy
  'image_20261018_084851.jpg': 'paneer-mutter-rogan-gravy',
  'image_20261018_084903.jpg': 'mushroom-mutter-rogan-gravy',
  'image_20261018_084849.jpg': 'gobi-mutter-rogan-gravy',
  'image_20261018_084902.jpg': 'babycorn-mutter-rogan-gravy',
};

console.log('Confirmed count:', Object.keys(confirmed).length);
const unconfirmedJpgs = allJpgs.filter(j => !confirmed[j]);
console.log('Unconfirmed JPGs count:', unconfirmedJpgs.length);
console.log('Unconfirmed JPGs:', unconfirmedJpgs);
