import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";
import { getURLsFromHTML } from "./crawl.js";

test('normalizing URL https long', () => {
    const baseURL = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(baseURL)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected);
});

test('normalizing URL https short', () => {
    const baseURL = 'https://blog.boot.dev/path'
    const actual = normalizeURL(baseURL)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected);
});

test('normalizing URL http long', () => {
    const baseURL = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(baseURL)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected);
});

test('normalizing URL http short', () => {
    const baseURL = 'http://blog.boot.dev/path'
    const actual = normalizeURL(baseURL)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected);
});

test('normalizing URL https CAPITALS', () => {
    const baseURL = 'HTTPS://BLOG.BOOT.DEV/PATH'
    const actual = normalizeURL(baseURL)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected);
});

test('getting URL <a links from HTML', () => {
    const baseURL = 'https://blog.boot.dev'
    const baseBody = '<a href="https://boot.dev">Learn Backend Development</a>'
    const actual = getURLsFromHTML(baseBody, baseURL)
    const expected = ['https://boot.dev' ]
    expect(actual).toStrictEqual(expected);
});

test('getting multiple URLs <a links from HTML', () => {
    const baseURL = 'https://blog.boot.dev'
    const baseBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
                <a href="https://courses.boot.dev"><span>Check Out Our Courses</span></a>
            </body>
        </html>
    `
    const actual = getURLsFromHTML(baseBody, baseURL)
    const expected = ['https://blog.boot.dev', 'https://courses.boot.dev']
    expect(actual).toStrictEqual(expected);
});

test('getting URL <a links from HTML with relative', () => {
    const baseURL = 'https://blog.boot.dev'
    const baseBody = `
        <html>
            <body>
                <a href="/candy"><span>Check Out The Candy Post</span></a>
                <a href="/hockey"><span>Check Out Our Hockey Post</span></a>
            </body>
        </html>
    `
    const actual = getURLsFromHTML(baseBody, baseURL)
    const expected = ['https://blog.boot.dev/candy', 'https://blog.boot.dev/hockey']
    expect(actual).toStrictEqual(expected);
});

test('getting URL <a links from HTML with relative and absolute', () => {
    const baseURL = 'https://blog.boot.dev'
    const baseBody = `
        <html>
            <body>
                <a href="/candy"><span>Check Out The Candy Post</span></a>
                <a href="/hockey"><span>Check Out Our Hockey Post</span></a>
                <a href="https://courses.boot.dev"><span>Check Out Our Courses</span></a>
            </body>
        </html>
    `
    const actual = getURLsFromHTML(baseBody, baseURL)
    const expected = ['https://blog.boot.dev/candy', 'https://blog.boot.dev/hockey', 'https://courses.boot.dev']
    expect(actual).toStrictEqual(expected);
});
