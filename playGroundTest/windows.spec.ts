// Working with multiple windows 

import test, { BrowserContext } from "@playwright/test";

test.describe("Working with Multiple Windows", async () => {

    let context: BrowserContext;
    const url = "https://manojkumar4636.github.io/Selenium_Practice_Hub/pages/Window.html";
    test.beforeAll("Create a New Context", async ({ browser }) => {
        context = await browser.newContext();
    })

    test("Switch to New Window", async () => {
        const page = await context.newPage();
        await page.goto(url);

        const [newWindow] = await Promise.all([
            page.waitForEvent('popup'),
            page.click("#home")
        ]);

        var title = await newWindow.title();
        var newWindowURL = newWindow.url();
        await newWindow.setViewportSize({
            width: 1500,
            height: 1000
        })
        await newWindow.click('[href="pages/Edit.html"]');
        await newWindow.waitForTimeout(5000);
        console.log(`the new window title is ${title} and its url is ${newWindowURL}`);

    })
})

