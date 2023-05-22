function main(){

    //If the number of CLI arguments is less than 1, print an error and exit.
    if (process.argv.length < 3){
        console.log('no website provided')
      }
      //If the number of CLI arguments is more than 1, print an error and exit.
      if (process.argv.length > 3){
        console.log('too many arguments provided')
      }

      //If we have exactly one CLI argument, it's the "baseURL", so print some kind of message letting the user know the crawler is starting at that baseURL.
      const baseURL = process.argv[2]
    
      console.log(`starting crawl of: ${baseURL}...`)
      
}
main();