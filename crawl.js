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

async function crawlPage(currentURL){

    console.log(`actively crawling: ${currentURL}`)

    //Handle error gracefully when there is a bad link in the website
    try {
        const resp = await fetch(currentURL)

        //resp.text() return as promise in text format
        console.log(await resp.text()) 
    } catch(err) {
        console.log(`error in fetch: ${err.message}m on page: ${currentURL}`)
    }
    
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}