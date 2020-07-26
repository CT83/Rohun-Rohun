// var WtoN = require('words-to-num');

// import WtoN from 'words-to-num';
// console.log(WtoN.convert('one hundred and 42')); // => 142

import wordsToNumbers from 'words-to-numbers';
var res = wordsToNumbers.wordsToNumbers('one hundred', { fuzzy: true }); //100
console.log(res)