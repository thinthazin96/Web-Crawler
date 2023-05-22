const {JSDOM} = require('jsdom')

//this function return normalized URL
function normalizeURL(url) {
    const urlObj = new URL(url) //Parse URL string using the WHATWG API
    let fullPath = `${urlObj.host}${urlObj.pathname}` //Store host and pathname
    
    //Slash Case: Take off the '/' if it exists in URL
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

//this function take a string of HTML and returns a list of all the link URLs
function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    for(const aElement of aElements) {
        if(aElement.href.slice(0,1) === '/'){
            try {
                urls.push(new URL(aElement.href, baseURL).href)
            }catch(err){
                console.log(`${err.message}: ${aElement.href}`)
            }
        } else{
            try {
                urls.push(new URL(aElement.href).href)
            } catch(err){
                console.log(`${err.message}: ${aElement.href}`)
            }
        }
    }
    return urls
}

async function crawlPage(baseURL, currentURL, pages){

    // FOR EXTERNAL LINK
    //baseURL is the domain of the website
    const baseURLObj = new URL(baseURL)
    //currentURL is the page we are currently crawling
    const currentURLObj = new URL(currentURL)
    //if domain is different from current, return pages we have visited
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }
    
    // FOR INTERNAL LINK
    //normalize the current URL
    const normalizedCurrentURL = normalizeURL(currentURL)
    //If the pages object already has an entry for the normalized version of the current URL, just increment the count and return the current pages.
    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    //set 1 for the first visit to new URL
    pages[normalizedCurrentURL] = 1
    console.log(`actively crawling: ${currentURL}`)


    //Handle error gracefully when there is a bad link in the website
    try {
        const resp = await fetch(currentURL)
        //If the HTTP status code is an error level code, print an error and return
        if(resp.status > 399){
            console.log(`error in fetch with status code ${resp.status} on page: ${currentURL}`)
            return pages
        }

        //If the response content-type header isn't text/html print and error and return
        const contentType = resp.headers.get("content-type")
        //Edge case: if the response content-type header has text/html and others content-type, we want return the body
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return pages
        }

        //resp.text() return as promise in text format
        const htmlBody = await resp.text()
        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        //Recursively crawl each URL you found on the page and update the pages to keep an aggregate count
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }

        } catch(err) {
        console.log(`error in fetch: ${err.message}m on page: ${currentURL}`)
        }
        //return the updated pages object
        return pages
}



module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}