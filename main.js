import { crawlPage } from "./crawl.js"
import { printReport } from "./report.js"

async function main() {
    const argv = process.argv
    if (argv.length < 3) {
        console.error(`Please provide an argument`)
    }
    if (argv.length > 3) {
        console.error(`Too many arguments provided`)
    }
    const baseURL = process.argv[2]
    console.log(`Crawler is starting at ${baseURL}`)
    const pages = await crawlPage(baseURL)
    console.log('Report is generating')
    printReport(pages)
}

main()
