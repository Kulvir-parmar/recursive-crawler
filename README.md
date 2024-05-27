# Recursive Crawler

A simple **web crawler** built in typescript😷. It recursively looks for all the hyperlinks with same hostname as the input base URL. Any hyperlink which does not have same hostname are not crawled. It also returns the count of the number of hints for each hyperlink.

## Steps to run the crawler

```bash
bun run dev  <base-url>
```

**example - <google.com>**
```bash
bun run dev  https://google.com/
```
