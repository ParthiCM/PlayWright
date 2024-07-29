import { Page } from "@playwright/test";

export default class loginCommands {
    public static async login(page: Page, url: string, data: any) {
        const { firstName, lastName, gender,
            DateOfBirth, Subjects, Hobbies,
            ProfilePic, CurrentAddress, Location
        } = data

        await page.goto(url);
        await page.fill("#firstName", firstName);
        await page.fill("#lastName", lastName);
        await page.fill("[placeholder='name@example.com']", `${firstName}.${lastName}@xmail.com`);
        await  page.waitForTimeout(3000);

        // if(gender.toLowerCase() == "male"){
        //     await page.locator("#gender-radio-1").check();
        // }else{
        //     await page.locator("#gender-radio-2").check();
        // }
        await console.log("number "+(Math.floor(Math.random() * 1000000000)));
        
        await page.fill("#userNumber", "1234567890");
        await  page.waitForTimeout(3000);

        await page.locator("#dateOfBirthInput").clear();
        await  page.waitForTimeout(3000);

        await page.fill("#dateOfBirthInput",DateOfBirth);
        await  page.waitForTimeout(3000);

        await page.fill(".subjects-auto-complete__value-container",Subjects);
        await  page.waitForTimeout(3000);

        Hobbies.forEach(async (element: string) => {
            if(element.toLowerCase() == "Sports"){
                await page.locator("#hobbies-checkbox-1").check();
            }else if(element.toLowerCase() == "Reading"){
                await page.locator("#hobbies-checkbox-2").check();
            }else{
                await page.locator("#hobbies-checkbox-3").check();
            }
        });

        await page.locator("#uploadPicture").setInputFiles(ProfilePic);
        await  page.waitForTimeout(3000);

        await page.locator("[placeholder='Current Address']").fill(CurrentAddress);

        // yet to add location
    }
}

