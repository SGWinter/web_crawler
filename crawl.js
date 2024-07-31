function normalizeURL(toNormalize) {
    const newURL =
        new URL(toNormalize);
    let urlPath = newURL.pathname.toString();
    if (urlPath.slice(-1) === '/') {
        urlPath = urlPath.slice(0, -1)
    }
    return `${newURL.host}${urlPath}`;
}

export { normalizeURL };
