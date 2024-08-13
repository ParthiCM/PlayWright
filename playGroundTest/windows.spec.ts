// Working with multiple windows 

import test, { BrowserContext, expect } from "@playwright/test";
import { log } from "console";

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
        console.log(`the new window title is ${title} and its url is ${newWindowURL}`);
        expect(await newWindow.title()).toEqual("Interact with Edit Fields");
        expect(newWindow.url()).toEqual("https://manojkumar4636.github.io/Selenium_Practice_Hub/pages/Edit.html");
    });

    test("Open Multiple Windows", async () => {
        var multiWindow = await context.newPage();
        await multiWindow.goto(url);
        const [NewWindows] = await Promise.all([
            multiWindow.waitForEvent("popup"),
            multiWindow.click('[onclick="openWindows()"]')
        ]);

        var newPages = NewWindows.context().pages();
        console.log(`Total number of pages is ${newPages.length}`);

        newPages.forEach(async element => {
            var title = await element.title();
            var url = element.url();

            console.log(`url = ${url} | title = ${title}`);

            if (title == "Interact with Buttons") {
                await element.click("#home");
            }
        });
        expect(newPages).toEqual(2);
        await multiWindow.waitForTimeout(5000);
    });

    test("Do not close the parent window ", async () => {
        var parentWindow = await context.newPage();
        await parentWindow.goto(url);
        var parentWindowTitle = parentWindow.url();

        const [windows] = await Promise.all([
            parentWindow.waitForEvent("popup"),
            parentWindow.click("[style='background-color:lightgreen']")
        ]);
        var ListOfWindows = windows.context().pages();
        await windows.waitForLoadState();
        console.log(`Total number of Windows are ${ListOfWindows.length}`);
        expect(ListOfWindows.length).toEqual(2);

        ListOfWindows.forEach(async element => {
            console.log(`Title = ${await element.title()} | ${element.url()}`);

            if (element.url() !== parentWindowTitle) {
                await element.setViewportSize({
                    height: 1080,
                    width: 720
                });
                //await element.waitForTimeout(5000);
                await element.close();
            }
        });
        await parentWindow.waitForTimeout(5000);
    })
})

