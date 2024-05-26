import { crawlPage } from "./crawl";

async function main() {
    if (process.argv.length < 3) {
        console.log("No website provided");
        process.exit(1);
    }
    if (process.argv.length > 3) {
        console.log("Too many command line arguments");
        process.exit(1);
    }

    const baseUrl = process.argv[2];
    console.log("starting crawl of", baseUrl);
    const crawledURLs = await crawlPage(baseUrl, baseUrl, new Map());
    console.log(crawledURLs);
}

main();
