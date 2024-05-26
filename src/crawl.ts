import * as jsdom from "jsdom";

const { JSDOM } = jsdom;

async function crawlPage(
    baseURL: string,
    currentURL: string,
    pages: Map<string, number>,
): Promise<Map<string, number>> {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    const currentCount = pages.get(normalizedCurrentURL);

    if (currentCount! > 0) {
        pages.set(normalizedCurrentURL, currentCount! + 1);
        return pages;
    }

    pages.set(normalizedCurrentURL, 1);
    console.log("actively crawling", currentURL);

    try {
        const page = await fetch(currentURL);
        if (page.status > 399) {
            console.log(
                "failed to fetch with status code",
                page.status,
                "on",
                currentURL,
            );
            return pages;
        }

        const contentType = page.headers.get("content-type");
        if (!contentType?.includes("text/html")) {
            console.log("Content type", contentType, "on", currentURL);
        }
        const htmlBody = await page.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for (const url of nextURLs) {
            pages = await crawlPage(baseURL, url, pages);
        }
    } catch (error) {
        console.log("failed to fetch", error, "on", currentURL);
    }

    return pages;
}

function getURLsFromHTML(htmlBody: string, baseURL: string): string[] {
    const urls: string[] = [];

    const dom = new JSDOM(htmlBody);
    const anchorElements = dom.window.document.querySelectorAll("a");

    for (const anchor of anchorElements) {
        if (anchor.href.slice(0, 1) === "/") {
            try {
                const urlObj = new URL(`${baseURL}${anchor.href}`);
                urls.push(urlObj.href);
            } catch (error) {
                console.log("error with relative url", error);
            }
        } else {
            try {
                const urlObj = new URL(anchor.href);
                urls.push(urlObj.href);
            } catch (error) {
                console.log("error with absolute url", error);
            }
        }
    }
    return urls;
}

function normalizeURL(urlString: string): string {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
