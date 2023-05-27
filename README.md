Web Crawler

Type of application: CLI application which run on local computer using Node.js
Purpose: Crawl a website and producre a report of the internal linking structure of the website(i.e. which pages are linked to which pages in the website)
Usage: Web Marketers or SEO Search Engine Optimization 

Set up
1. Installed nvm
2. Create .nvmrc file in the root project
    i. add node version 
3. Run npm init
4. Add "start": "node main.js" under script obj in package.json
5. Create .gitignore file in the root project
    i. ignore node_modules
6. Install jest module
7. Create crawl.test.js to test functions
8. Installed JSDOM

Run the program
npm run [website]

Run the test cases
npm run test