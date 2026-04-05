import { ExcutorEnvironment } from "@/actions/execution/types";
import { PageToHTML } from "../task/page-to-html";

export const PageToHtmlExecutor = async (environment: ExcutorEnvironment<typeof PageToHTML>) => {
    console.log("Page to HTML...");

    try {
        const html = await environment.getPage()?.content();
        if (!html) return false;

        environment.setOutput("HTML", html)
        return true;

    } catch (error) {
        console.error(error);
        return false;
    }

}