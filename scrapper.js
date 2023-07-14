const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function performScrapper() {
    var content = "";
    let url = "test.com";
    let term = "test";
    let accountEmail = "";
    let accountPassword = "";
    const driver = await new Builder().forBrowser('chrome').build();
    console.log("************************************************")
    console.log("Scrapper Inicializado.")
    console.log("************************************************")
    console.log("[")
    content += ("[\n");

    try {
        await driver.get(url)
            .then(async () => {
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(2000);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(accountEmail, Key.RETURN).perform();
                await delay(2000);
                await driver.actions().sendKeys(accountPassword, Key.RETURN).perform();
                await delay(2000);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.RETURN).perform();
                await delay(2000);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(2000);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(2000);
                await driver.actions().sendKeys(term, Key.RETURN).perform();
                await delay(5000);
            })
            .then(() => {
                // console.log("]")
                // content += "]\n"
                // const blob = Buffer.from(content, 'utf8');
                // const filename = 'result11.json';
                // const fileStream = fs.createWriteStream(filename);
                // fileStream.write(blob, 'binary');
                // fileStream.end();
                // fileStream.on('finish', () => {
                //     console.log(`File "${filename}" created.`);
                // });
                return driver.sleep(2000);
            });
    } finally {
        // Quit the WebDriver
        await driver.quit();
    }
}

performScrapper();
