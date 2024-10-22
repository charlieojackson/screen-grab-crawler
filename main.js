const puppeteer = require('puppeteer');
const path = require('path');

let urls = [
    "https://charlieojackson.co.uk/",
    "https://charlieojackson.co.uk/python/keyword-research-with-google-suggest.php",
]

async function runCrawl() {
    const browser = await puppeteer.launch({
        headless: false,
        timeout: 100000
    });

    const page = await browser.newPage();
    
    let count = 0
    for (let url of urls) {
        count += 1
        await page.goto(url, {
            waitUntil: 'networkidle2'
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));

        await page.screenshot({ path: path.join(__dirname,`screen-grabs/${count}-fullpage.png`), fullPage: true });
    }
    
    browser.close();
}

runCrawl();