import test, { BrowserContext, expect } from "@playwright/test";
import { describe } from "node:test";
describe("Testing Alerts in Serial Mode", () => {
   
   test.describe.configure({
      mode : "serial"
   });

   let context: BrowserContext;
   const url = "https://manojkumar4636.github.io/Selenium_Practice_Hub/pages/Alert.html";

   test.beforeAll("create a new context", async ({ browser }) => {
      context = await browser.newContext();
   })

   test("Accept Alert ", async () => {
      const page = await context.newPage();
      await page.goto(url);
      await page.waitForTimeout(5000);
      page.on("dialog", async (dialog) => {
         var value = dialog.message();
         console.log(`Text content in the Alert Dialog is ${value}`);
         await dialog.accept();
      });

      await page.click("[onclick='normalAlert()']");
   });

   test("Confirm Alert and Verify", async () => {
      const page = await context.newPage();
      await page.goto(url);
      //await page.waitForTimeout(5000);
      page.on("dialog", async (dialog) => {
         var value = dialog.message();
         console.log(`Text content in the Alert Dialog is ${value}`);
         await dialog.accept();
      });

      await page.click("[onclick='confirmAlert()']");
      var result = page.locator("#result");
      await result.waitFor({ state: "visible", timeout: 5000 });
      await expect(result).toHaveText("You pressed OK!");
   });

   test("Cancel Alert and Verify", async () => {
      const page = await context.newPage();
      page.goto(url);
      page.on("dialog", async (dialog) => {
         var value = dialog.message();
         console.log(`Text content in the Alert Dialog is ${value}`);
         await dialog.dismiss();
      });

      await page.click("[onclick='confirmAlert()']");
      var result = page.locator("#result");
      await result.waitFor({ state: "visible", timeout: 5000 });
      await expect(result).toHaveText("You pressed Cancel!");
   });

});


