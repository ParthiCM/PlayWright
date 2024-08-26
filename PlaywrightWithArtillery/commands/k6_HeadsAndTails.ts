import { Page } from "@playwright/test";

export async function k6headsAndTails(page: Page, url: string) {
    await page.goto(url);
    await page.click('[href="/flip_coin.php"]');
    //await page.waitForEvent("domcontentloaded");

    for (let index = 0; index < 20; index++) {
        await page.locator('[value="Bet on heads!"]').click();
        await page.waitForLoadState("domcontentloaded");
        console.log(`Bet on Heads => ${await page.locator('h2').innerText()}`);
    }

    for (let index = 0; index < 20; index++) {
        await page.locator('[value="Bet on tails!"]').click();
        await page.waitForLoadState("domcontentloaded");
        console.log(`Bet on Tails => ${await page.locator('h2').innerText()}`);
    }
}
