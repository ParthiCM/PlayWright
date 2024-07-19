import test, { expect } from "@playwright/test";

test.describe("Practicing Playwright Edit", async () => {

    const baseUrl = "https://manojkumar4636.github.io/Selenium_Practice_Hub/home.html";
    test.only("Practising the EDIT options",
        { tag: '@editTest', }

        , async ({ page }) => {
            await page.goto(baseUrl);
            console.log(page.url());
            expect(page.url(), "Invalid page URL").toBe(baseUrl);
            expect(await page.title(), "Invalid Page Title").toBe("Selenium Playground");
            await page.click("[href='pages/Edit.html']");
            await page.fill("[id='email']", "test data");
            await page.fill("[value='Append ']", "Appending");
            await page.locator("[value='Clear me!!']").clear();
            var text = await page.locator("[value='TestLeaf']").getAttribute("value");
            var defaultText = await page.getByText('Get default text entered').textContent();
            console.log(text);
            console.log(defaultText);
            expect(text).toBe("TestLeaf");
        });
})
