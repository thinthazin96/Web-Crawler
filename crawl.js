//this function return normalized URL
function normalizeURL(url) {
    const urlObj = new URL(url) //Parse URL string using the WHATWG API
    let fullPath = `${urlObj.host}${urlObj.pathname}` //Store host and pathname
    
    //Check if the URL is valid 
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath

}

module.exports = {
    normalizeURL
}