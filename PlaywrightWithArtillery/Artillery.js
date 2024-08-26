const { k6headsAndTails } = require("../dist/commands/k6_HeadsAndTails");
const {chromium } = require("@playwright/test");

async function artillery() {
    var url = "https://test.k6.io/";
    var browser = await chromium.launch();
    var context = await browser.newContext();
    const page = await context.newPage();
    await k6headsAndTails(page, url);
}

module.exports = {
    artillery
}