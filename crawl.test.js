const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

// Edge Cases
//missing spelling
// no input URL
// more than one slash in path

test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'  
    expect(actual).toEqual(expected)
})