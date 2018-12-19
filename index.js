var user = process.env.SNAP_FITNESS_USERNAME;
var password = process.env.SNAP_FITNESS_PASSWORD;

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}
async function screenshotDOMElement(page, selector, padding = 0) {
    const rect = await page.evaluate(selector => {
        const element = document.querySelector(selector);
        const {x, y, width, height} = element.getBoundingClientRect();
        return {left: x, top: y, width, height, id: element.id};
    }, selector);

    return await page.screenshot({
        path: 'element.png',
        clip: {
            x: rect.left - padding,
            y: rect.top - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2
        }
    });
}

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({width: 1000, height: 600, deviceScaleFactor: 2});
    await page.goto('https://member.snapfitness.com/login');
    console.log("got to page");
    await page.click('#root > div > div > div:nth-child(2) > div > div > form > fieldset > div:nth-child(3) > div > input');
    console.log("clicked email");
    await page.keyboard.type(user);
    console.log("entered email");
    await page.click('#root > div > div > div:nth-child(2) > div > div > form > fieldset > div:nth-child(4) > div > input');
    await page.keyboard.type(password);
    console.log("entered password");
    console.log("logging in");
    await page.click('#root > div > div > div:nth-child(2) > div > div > form > fieldset > div.form-actions.form-actions-remember-me > button');
    await delay(10000);
    await page.click('#left-panel > nav > ul > li.top-menu-invisible.open.active > a');
    await page.goto('https://member.snapfitness.com/billing/history');
    await delay(10000);
    console.log("pre-billing info");
    await page.click('#main > div > div > div > div.col-sm-8 > div > div.panel-body > div > table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > a');
    await delay(5000);
    console.log("loaded billing info");
    await screenshotDOMElement(page, 'body > div.modal.fade.ng-isolate-scope.in > div > div', 0);
    await browser.close();
})();
