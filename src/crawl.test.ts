import { test, expect } from "@jest/globals";

import { normalizeURL, getURLsFromHTML } from "./crawl";

test("normalizeURL strip protocol", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";

    expect(actual).toEqual(expected);
});

test("normalizeURL strip trail slash", () => {
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";

    expect(actual).toEqual(expected);
});

test("normalizeURL UPPER case", () => {
    const input = "https://BLOG.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";

    expect(actual).toEqual(expected);
});

test("normalizeURL strip HTTP", () => {
    const input = "http://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";

    expect(actual).toEqual(expected);
});

test("get absolute URL from HTML", () => {
    const inputHTMLBody = `
                    <html>
                        <body>
                            <a href="https://blog.boot.dev/path">
                                Boot.dev Blog
                            </a>
                        </body>
                    <html>
                `;

    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected: string[] = ["https://blog.boot.dev/path"];

    expect(actual).toEqual(expected);
});

test("get relative URL from HTML", () => {
    const inputHTMLBody = `
                    <html>
                        <body>
                            <a href="/path/">
                                Boot.dev Blog
                            </a>
                        </body>
                    <html>
                `;

    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected: string[] = ["https://blog.boot.dev/path/"];

    expect(actual).toEqual(expected);
});

test("get both types of URLs from HTML", () => {
    const inputHTMLBody = `
                    <html>
                        <body>
                            <a href="https://blog.boot.dev/path1/">
                                Boot.dev Blog1
                            </a>
                            <a href="/path2/">
                                Boot.dev Blog2
                            </a>
                        </body>
                    <html>
                `;

    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected: string[] = [
        "https://blog.boot.dev/path1/",
        "https://blog.boot.dev/path2/",
    ];

    expect(actual).toEqual(expected);
});

test("get invalid URLs from HTML", () => {
    const inputHTMLBody = `
                    <html>
                        <body>
                            <a href="invalid">
                                invalid
                            </a>
                        </body>
                    <html>
                `;

    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected: string[] = [];

    expect(actual).toEqual(expected);
});
