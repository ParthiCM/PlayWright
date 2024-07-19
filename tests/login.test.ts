import test, { chromium } from "@playwright/test";
import {data} from "../testData/ApplyRedaction.json";
import { loginCommand } from "../helperMethods/loginCOmmands";


data.forEach(element => {
    const {name, password} = element
    test(`Reefreview Login Test - user : ${name}`, async () => {
        const browser = await chromium.launch({
            headless: false
        });
        const newContext = await browser.newContext();
        const page = await newContext.newPage();
        
        await loginCommand.login(page,name,password);
        
    });
    
});





