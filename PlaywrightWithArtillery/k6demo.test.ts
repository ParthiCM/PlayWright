import test, { chromium } from "@playwright/test";

test.describe("Load testing with Playwright and Artillery", async () => {
    test.describe.configure({
        "mode": "serial"
    })

    test("K6 Demo site with Playwright and Artillery", async () => {
        var url = "https://test.k6.io/";
        var browser = await chromium.launch();
        var context =  await browser.newContext();
        const page = await context.newPage();
        await page.goto(url);
        await page.click('[href="/flip_coin.php"]');
        await page.waitForEvent("domcontentloaded");

        for (let index = 0; index < 20; index++) {
            await page.locator('[value="Bet on heads!"]').click();
            await page.waitForLoadState("domcontentloaded",{timeout:5000});
           console.log(`Bet on Heads => ${await page.locator('h2').innerText()}`);
        }
        
        for (let index = 0; index < 20; index++) {
            await page.locator('[value="Bet on tails!"]').click();
            await page.waitForLoadState("domcontentloaded",{timeout:5000});
           console.log(`Bet on Heads => ${await page.locator('h2').innerText()}`);
        }
    })
})