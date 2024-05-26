import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl";

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
