const fs = require('fs');

// Count items by main ingredient in the menu
const menu = [
  'paneer-tikka-masala',
  'mushroom-tikka-masala',
  'paneer-pallipalayam',
  'mushroom-pallipalayam',
  'gobi-pallipalayam',
  'babycorn-pallipalayam',
  'paneer-methi',
  'mushroom-methi',
  'gobi-methi',
  'paneer-maharani-dry',
  'mushroom-maharani-dry',
  'gobi-maharani-dry',
  'babycorn-maharani-dry',
  'paneer-chinthamani',
  'mushroom-chinthamani',
  'gobi-chithamani',
  'babycorn-chithamani',
  'paneer-mutter-rogan-gravy',
  'mushroom-mutter-rogan-gravy',
  'gobi-mutter-rogan-gravy',
  'babycorn-mutter-rogan-gravy',
  'paneer-butter-masala',
  'paneer-hariyali',
  'mushroom-hariyali',
  'gobi-hariyali',
  'babycorn-hariyali',
  'paneer-hyderabad-gravy',
  'mushroom-hyderabad-gravy',
  'gobi-hyderabad-gravy',
  'babycorn-hyderabad-gravy',
  'paneer-apoorvaa-special',
  'mushroom-apoorvaa-special',
  'gobi-apoorvaa-special',
  'babycorn-apoorvaa-special',
  'paneer-chettinad',
  'mushroom-chettinad',
  'gobi-chettinad',
  'babycorn-chettinad',
  'kadaai-paneer',
  'kadaai-mushroom',
  'kadaai-gobi',
  'kadaai-babycorn',
  'kadaai-veg',
  'paneer-sizzler',
  'mughlai-paneer',
  'mughlai-mushroom',
  'mughlai-gobi',
  'mughlai-babycorn',
  'monika-paneer',
  'monika-mushroom',
  'monika-gobi',
  'monika-babycorn',
];

const counts = { paneer: 0, mushroom: 0, gobi: 0, babycorn: 0, veg: 0 };
menu.forEach(item => {
  if (item.includes('paneer')) counts.paneer++;
  else if (item.includes('mushroom')) counts.mushroom++;
  else if (item.includes('gobi')) counts.gobi++;
  else if (item.includes('babycorn')) counts.babycorn++;
  else if (item.includes('veg')) counts.veg++;
});

console.log('Menu counts:', counts);
