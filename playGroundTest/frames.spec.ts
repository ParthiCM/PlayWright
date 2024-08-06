import test, { expect } from "@playwright/test";
import { equal } from "assert";

test.describe("Practicing Frames in Playwright", async () => {

    test.describe.configure({ 'mode': 'serial' })

    const baseUrl = "https://manojkumar4636.github.io/Selenium_Practice_Hub/home.html";
    test("Get total Number of Frames", async ({ page }) => {
        await page.goto(baseUrl);
        var FrameButton = page.locator("[href='pages/frame.html']");
        await FrameButton.waitFor({ 'state': 'visible', 'timeout': 5000 });
        await FrameButton.click();
        await page.waitForSelector("[src='countframes.html']",{state:'attached',timeout:5000});
        var allFrames = await page.frames();
        console.log(`Total number of frames is ${allFrames.length}`);
        await expect(await allFrames.length).toEqual(6);
    });

    test("Get Text from the first frame and Click in it", async ({ page }) => {
        await page.goto(baseUrl);
        var FrameButton = page.locator("[href='pages/frame.html']");
        await FrameButton.waitFor({ 'state': 'visible', 'timeout': 5000 });
        await FrameButton.click();

        await page.waitForSelector('[src="default.html"]', { timeout: 3000 });

        var FirstFrame = await page.frame('[src="default.html"]');
        console.log("May frame is  " + await FirstFrame?.textContent);

        await FirstFrame?.click("#Click");
        await FirstFrame?.waitForSelector("//*[text()='Hurray! You Clicked Me.']", { state: 'visible', timeout: 5000 });
        await page.waitForTimeout(5000);

        expect(await FirstFrame?.locator('#Click').textContent()).toEqual('Hurray! You Clicked Me.');
    });
});
