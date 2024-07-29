import test, { chromium } from "@playwright/test";
import {data} from "../testData/testData.json";
import loginCommand from "../helperMethods/loginCommands";


data.forEach(element => {
    const url = "https://demoqa.com/automation-practice-form";

    test(`QA Tools form : ${element.firstName}`, async () => {
        const browser = await chromium.launch({
            headless: false,
            args: ['--start-maximized'],
        });
        const newContext = await browser.newContext();
        const page = await newContext.newPage();
        
        await loginCommand.login(page,url,element);
        await  page.waitForTimeout(10000);
        
        
    });
    
});





