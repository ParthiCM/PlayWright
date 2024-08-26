import test, { chromium } from "@playwright/test";
import { k6headsAndTails } from "./commands/k6_HeadsAndTails";

test.describe("Load testing with Playwright and Artillery", async () => {
    test.describe.configure({
        "mode": "serial"
    })

    test("K6 Demo site with Playwright and Artillery", async () => {
        var url = "https://test.k6.io/";
        var browser = await chromium.launch();
        var context =  await browser.newContext();
        const page = await context.newPage();
        await k6headsAndTails(page,url);
    })
})