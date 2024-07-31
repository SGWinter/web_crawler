import { JSDOM } from 'jsdom'

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const linkArray = dom.window.document.querySelectorAll('a')
    const hrefArray = []

    for (const link of linkArray) {
        if (link.hasAttribute('href')) {
            let href = link.getAttribute('href')

            try {
                href = new URL(href, baseURL).href
                hrefArray.push(href)
            } catch(err) {
                console.log(`${err.message}: ${href}`)
            }
        }
    }

    return hrefArray;
}

function normalizeURL(toNormalize) {
    const newURL =
        new URL(toNormalize);
    let urlPath = newURL.pathname.toString();
    urlPath = urlPath.toLowerCase();
    if (urlPath.slice(-1) === '/') {
        urlPath = urlPath.slice(0, -1);
    }
    return `${newURL.host}${urlPath}`;
}

async function getPageHTML(currentURL) {
    let response
    try {
    response = await fetch(currentURL)
    } catch (err) {
        throw new Error(`Network error: ${currentURL}`)
    }

    if (response.status > 399) {
        throw new Error(`Status error: ${response.status}`)
    }

    const contentType = response.headers.get('Content-Type')
    if (!contentType || !contentType.includes('text/html')) {
        throw new Error(`Non-HTML response: ${contentType}`)
    }

    return response.text()
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const currentURLObj = new URL(currentURL)
    const baseURLObj = new URL(baseURL)
    if (currentURLObj.hostname !== baseURLObj.hostname) {
        return pages
    }

    const normCurrURL = normalizeURL(currentURL)
    if (!(normCurrURL in pages)) {
        pages[normCurrURL] = 1
    } else {
        pages[normCurrURL]++
        return pages
    }


    console.log(`crawling ${currentURL}`)
    let pageHTML = ''
    try {
        pageHTML = await getPageHTML(currentURL)
    } catch (err) {
        console.log(`${err.message}`)
    }
    const pageURLs = await getURLsFromHTML(pageHTML, baseURL)

    for (let page of pageURLs) {
        pages = await crawlPage(baseURL, page, pages)
    }

    return pages
}

export { normalizeURL, getURLsFromHTML, crawlPage };
