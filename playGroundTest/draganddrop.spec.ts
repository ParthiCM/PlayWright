import test, { BrowserContext } from "@playwright/test";

test.describe("Drag and Drop Test", async () => {
    let NewContext: BrowserContext;

    test.beforeAll("creating a new context", async ({ browser }) => {
        NewContext = await browser.newContext();
    })

    test("Drag&Drop connected sorting group", async () => {
        const page = await NewContext.newPage();
        await page.waitForLoadState();
        await page.goto("https://material.angular.io/cdk/drag-drop/examples");
        var sourceEle = page.locator("#cdk-drag-drop-connected-sorting-group #cdk-drop-list-0 div:nth-child(1)");
        await sourceEle.scrollIntoViewIfNeeded();
        var targetEle = page.locator("#cdk-drop-list-1 div:nth-child(1)");
        //await sourceEle.dragTo(targetEle);

        await sourceEle.hover();
        await page.mouse.down();
        await targetEle.hover();
        await page.mouse.up();
        await page.waitForTimeout(5000);
    })
    
    test.only("Simple Drag&Drop", async () => {
        const page = await NewContext.newPage();
        await page.waitForLoadState();
        await page.goto("https://commitquality.com/practice-drag-and-drop");
        var sourceEle = page.locator("#small-box");
        await sourceEle.scrollIntoViewIfNeeded();
        var targetEle = page.locator(".large-box ");
        await sourceEle.dragTo(targetEle);
        await page.pause();
    })

    // test("",async({page}) => {

    // })
})
