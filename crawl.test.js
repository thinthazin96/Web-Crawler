const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
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

test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const inputURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const inputURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one' ]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const inputURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () =>{
    const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
    const inputURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = []
    expect(actual).toEqual(expected)
})