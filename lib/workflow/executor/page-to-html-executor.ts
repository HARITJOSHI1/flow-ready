import { ExcutorEnvironment } from "@/actions/execution/types/executionEnv";
import { PageToHTML } from "../task/page-to-html";

export const PageToHtmlExecutor = async (environment: ExcutorEnvironment<typeof PageToHTML>) => {
    try {
        const html = await environment.getPage()?.content();
        if (!html) return false;

        environment.setOutput("HTML", html)
        return true;

    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }

}