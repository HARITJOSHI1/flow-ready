import { ExcutorEnvironment } from "@/actions/execution/types/executionEnv";
import { ExtractTextFrmElement } from "../task/extract-text-from-element";
import * as cheerio from "cheerio";

export const ExtractTextFromElementExecutor = async (environment: ExcutorEnvironment<typeof ExtractTextFrmElement>) => {
    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("Selector is not defined");
            return false;
        }

        const html = environment.getInput("Html");
        if (!html) {
            environment.log.error("html is not defined");
            return false;
        };

        const $ = cheerio.load(html);
        const element = $(selector);

        if (!element) {
            environment.log.error("Element not found");
            return false
        };

        const text = element.text();
        if (!text) {
            environment.log.error("Element has no text");
            return false;
        }

        environment.setOutput("Extracted text", text);

        return true;

    } catch (error: any) {
        environment.log.error(error.message);
        return false;
    }

}