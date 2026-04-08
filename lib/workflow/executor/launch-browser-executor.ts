import { ExcutorEnvironment } from "@/actions/execution/types/executionEnv";
import { AppNode } from "@/lib/types/nodes";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/launch-browser";

export const LaunchBrowserExecutor = async (environment: ExcutorEnvironment<typeof LaunchBrowserTask>) => {

    try {

        const websiteUrl = environment.getInput("Website URL");

        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === "development" ? false : "shell",
            defaultViewport: null,
        });


        // set browser once so that after execution of the flow close the instabnce in cleanup
        environment.setBrowser(browser);


        const page = await browser.newPage();
        await page.goto(websiteUrl);

        // set page here to always get the current page on demand
        environment.setPage(page);
        return true;

    } catch (error: any) {
        environment.log.error(error.message);
        if (environment.getBrowser()) {
            await environment.getBrowser()?.close();
        }
        return false;
    }

}