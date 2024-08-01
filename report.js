function printReport(pages) {
    console.log('Report is generating')
    const sortedPages = sortPages(pages)
    for (let page in sortedPages) {
        console.log(`${page} has ${sortedPages[page]} internal links`)
    }
}

function sortPages(pages) {
    let pageSort = []
    for (let page in pages) {
        pageSort.push([page, pages[page]])
    }

    pageSort.sort(function(a, b) {
        return b[1] - a[1];
    });

    let pageSortObj = {}
    pageSort.forEach(function(item) {
        pageSortObj[item[0]] = item[1]
    });

    return pageSortObj
}

export { printReport };
