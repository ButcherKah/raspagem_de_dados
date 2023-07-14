const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const { json } = require('stream/consumers');

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function readJSONFile(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      const username = jsonData.username;
      const password = jsonData.password;
      const url = jsonData.url;
      const term = jsonData.term;
      return { username, password, url, term };
    } catch (error) {
      console.error('Error reading JSON file:', error);
      return null;
    }
  }

async function performScrapper() {
    const filePath = './settings.json';
    const jsonData = readJSONFile(filePath);
    var content = "";
    let url = jsonData.url;
    let term = jsonData.term;
    let accountEmail = jsonData.username;
    let accountPassword = jsonData.password;
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
