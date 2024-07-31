function main() {
    const argv = process.argv
    if (argv.length < 3) {
        console.error(`Please provide an argument`)
    }
    if (argv.length > 3) {
        console.error(`Too many arguments provided`)
    }
    const baseURL = process.argv[2]
    console.log(`Crawler is starting at ${baseURL}`)
}

main()
