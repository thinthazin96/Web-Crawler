const {test, expect} = require('@jest/globals');

const {normalizeURL} = require('./crawl.js');

// Edge Cases
//missing spelling
// no input URL
// more than one slash in path
