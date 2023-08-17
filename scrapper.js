const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const { json } = require('stream/consumers');
const { parse } = require('path');

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
    content += '[\n'
    console.log('[\n')

    try {
        await driver.get(url)
            .then(async () => {
                await delay(5000);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(2000);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(2000);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(2000);
                // await driver.actions().sendKeys(Key.TAB).perform();
                // await delay(2000);
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
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(200);
                await driver.actions().sendKeys(Key.TAB).perform();
                await delay(2000);
                await driver.actions().sendKeys(term, Key.RETURN).perform();
                await delay(5000);
                let totalScrapped = 0;
                while (totalScrapped != 200) {
                    await driver.findElements(By.css('[data-testid="cellInnerDiv"]'))
                    .then(async (elements) => {
                        for(let i = 0; i < 4; i++) {
                            await delay(200);
                            await elements[i].findElement(By.css('time, [datetime]'))
                            .then(dateTime => {
                                dateTime.getAttribute('datetime')
                                    .then(datetimeValue => {
                                        console.log('\t{\n')
                                        console.log(`\t\t"timestamp": "${datetimeValue}",`);
                                        content += '\t{\n';
                                        content += `\t\t"timestamp": "${datetimeValue}",`;
                                        console.log('\n');
                                        content += '\n';
                                    });
                            })
                            .catch(error => {   
                                console.log('\t\t{\n\t\t"timestamp": null,\n');
                                content += '\t\t{\n\t\t"timestamp": null,\n'
                            })
                            await elements[i].findElement(By.css('[data-testid="tweetText"]'))
                                .getText()
                                .then(text => {
                                    let withoutReturns = text.replace(/\n/g, "");
                                    let withoutQuotes = withoutReturns.replace(/"/g, "'");
                                    console.log(`\t\t"conteudo": "${withoutQuotes}",`);
                                    content += `\t\t"conteudo": "${withoutQuotes}",`;
                                    console.log('\n');
                                    content += '\n';
                                })
                                .catch(error => {
                                    console.error('An error occurred:', error);
                                });
                            await elements[i].findElements(By.css('[data-testid="app-text-transition-container"]'))
                                .then(commentElements => {
                                    commentElements[0].getText()
                                        .then(text => {
                                            let parsedText = text.length === 0 ? "0" : text;
                                            console.log(`\t\t"comentarios": "${parsedText}",`);
                                            content += `\t\t"comentarios": "${parsedText}",`;
                                            console.log('\n');
                                            content += '\n';
                                        })
                                        .catch(error => {
                                            console.error('An error occurred:', error);
                                        });
                                    commentElements[1].getText()
                                    .then(text => {
                                        let parsedText = text.length === 0 ? "0" : text;
                                        console.log(`\t\t"retuitadas": "${parsedText}",`);
                                        content += `\t\t"retuitadas": "${parsedText}",`;
                                        console.log('\n');
                                        content += '\n';
                                    })
                                    .catch(error => {
                                        console.error('An error occurred:', error);
                                    });
                                    commentElements[2].getText()
                                    .then(text => {
                                        let parsedText = text.length === 0 ? "0" : text;
                                        console.log(`\t\t"curtidas": "${parsedText}",`);
                                        content += `\t\t"curtidas": "${parsedText}",`;
                                        console.log('\n');
                                        content += '\n';
                                    })
                                    .catch(error => {
                                        console.error('An error occurred:', error);
                                    });
                                    commentElements[3].getText()
                                    .then(text => {
                                        let parsedText = text.length === 0 ? "0" : text;
                                        console.log(`\t\t"atividade": "${parsedText}"`);
                                        console.log('\t},')
                                        content += `\t\t"atividade": "${parsedText}"`;
                                        if (totalScrapped === 199) {
                                            content += '\n\t}\n'
                                        } else {
                                            content += '\n\t},\n'
                                        }
                                    })
                                    .catch(error => {
                                        console.error('An error occurred:', error);
                                    });
                                })
                                .catch(error => {
                                    console.error('An error occurred:', error);
                                });
                            totalScrapped++;
                        }
                        for(let i = 0; i < 50; i++) {
                            await driver.actions().sendKeys(Key.DOWN).perform();
                        }
                        await delay(5000);
                        totalScrapped += 4;
                    })
                    .catch(error => {
                        console.error('An error occurred:', error);
                    })
                }
            })
            .then(() => {
                console.log("\n]")
                content += "\n]"
                const blob = Buffer.from(content, 'utf8');
                const filename = 'result.json';
                const fileStream = fs.createWriteStream(filename);
                fileStream.write(blob, 'binary');
                fileStream.end();
                fileStream.on('finish', () => {
                    console.log(`File "${filename}" created.`);
                });
                return driver.sleep(2000);
            });
    } finally {
        await driver.quit();
    }
}

performScrapper();