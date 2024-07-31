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

export { normalizeURL, getURLsFromHTML };
