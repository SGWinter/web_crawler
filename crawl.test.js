import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test('normalizing URL https long', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('normalizing URL https short', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('normalizing URL http long', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('normalizing URL http short', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});
