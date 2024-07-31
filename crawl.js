import { JSDOM } from 'jsdom'

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const linkArray = dom.window.document.querySelectorAll('a')
    const hrefArray = []
    for (let i = 0; i < linkArray.length; i++) {
        const newLink = linkArray[i].href
        if (newLink.includes('http')) {
            hrefArray.push(newLink.slice(0, -1))
        } else {
            hrefArray.push(`${baseURL}${newLink}`)
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
        console.log(`Status error: ${response.status}`)
        return
    }

    const contentType = response.headers.get('Content-Type')
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Non-HTML response: ${contentType}`)
        return
    }

    return await response.text()
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    if (!currentURL.includes(baseURL)) {
        return pages
    }
    const normCurrURL = normalizeURL(currentURL)
    if (!(normCurrURL in pages)) {
        pages[normCurrURL] = 1
    } else {
        pages[normCurrURL] += 1
        return pages
    }


    const pageHTML = await getPageHTML(currentURL)
    const pageURLs = await getURLsFromHTML(pageHTML, baseURL)

    for (let page of pageURLs) {
        crawlPage(baseURL, page, pages)
    }

    return pages
}

export { normalizeURL, getURLsFromHTML, crawlPage };
