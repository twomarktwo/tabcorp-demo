import jest from 'jest';
import fs from 'fs';
import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

// Build a chrome driver to run the tests with
chrome.setDefaultService(new chrome.ServiceBuilder(require('chromedriver').path).build());
var options: chrome.Options = new chrome.Options();
options.addArguments("--window-size=800,650");
var browser = new webdriver.Builder()
    .setChromeOptions(options)
    .withCapabilities({ browserName: "chrome" })
    .build();

describe("Test Lotto Control", () => {

    // Cleanup by closing the browser
    afterAll(async (done) => {
        try {
            await browser.close();
            done();
        } catch (e) {
            done(e);
        }
    });

    test("succesfull loads the page, takes a screenshot, clicks autofill and has 7 primary lotto numbers are 1 powerball selected, taking a screenshot on success", async (done) => {
        try {
            await browser.get("http://localhost:3000");
            let title = await browser.getTitle();
            expect(title).toBe("Mark Jones - Tabcorp Demo");

            let beforeData = await browser.takeScreenshot(); //
            fs.writeFileSync("e2e-demo-results/before.png", beforeData, 'base64');
            let lotoGrids = await browser.findElements(webdriver.By.css(".lotto-grid"));
            expect(lotoGrids.length).toBe(2);

            // No items lotto numbers should be selected
            let primaryCells = await lotoGrids[0].findElements(webdriver.By.css(".lotto-cell"));
            let selectedPrimaryCells = await lotoGrids[0].findElements(webdriver.By.css(".lotto-cell.selected"));
            expect(primaryCells.length).toBe(35);
            expect(selectedPrimaryCells.length).toBe(0);
            let powerballCells = await lotoGrids[1].findElements(webdriver.By.css(".lotto-cell"));
            let selectedPowerball = await lotoGrids[1].findElements(webdriver.By.css(".lotto-cell.selected"));
            expect(powerballCells.length).toBe(20);
            expect(selectedPowerball.length).toBe(0);

            let autofillButton = await browser.findElement(webdriver.By.id("autofill-button"));
            await autofillButton.click();
            await browser.wait(isNotPresent(browser, webdriver.By.id("loading-spinner-overlay")));
            let afterData = await browser.takeScreenshot();
            fs.writeFileSync("e2e-demo-results/after.png", afterData, 'base64');

            lotoGrids = await browser.findElements(webdriver.By.css(".lotto-grid"));
            expect(lotoGrids.length).toBe(2);

            // 7 selected items in the first grid
            selectedPrimaryCells = await lotoGrids[0].findElements(webdriver.By.css(".lotto-cell.selected"));
            expect(selectedPrimaryCells.length).toBe(7);

            // 1 powerball in the second grid
            selectedPowerball = await lotoGrids[1].findElements(webdriver.By.css(".lotto-cell.selected"));
            expect(selectedPowerball.length).toBe(1);

        } catch (error) {
            return done(error);
        }
        done();
    }, 20000);
});

/**
 * Helper function to wait until an element is no longer present
 * @param driver The webdriver instance
 * @param locator The locator condition to regularly run (Once this returns no elements the wait has been met)
 */
async function isNotPresent(driver: webdriver.WebDriver, locator: webdriver.Locator) {
    await driver.wait(() => {
        return driver.findElements(locator).then((elements) => {
            if (elements.length <= 0) {
                return true;
            }
            return false;
        });
    }, 20000, 'The element was still present when it should have disappeared.');
}