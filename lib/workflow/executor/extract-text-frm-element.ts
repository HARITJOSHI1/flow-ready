import { ExcutorEnvironment } from "@/actions/execution/types";
import { ExtractTextFrmElement } from "../task/extract-text-from-element";
import * as cheerio from "cheerio";

export const ExtractTextFromElementExecutor = async (environment: ExcutorEnvironment<typeof ExtractTextFrmElement>) => {
    console.log("Extract text from element...");

    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            console.error("Selector is not defined")
            return false;
        }

        const html = environment.getInput("Html");
        if (!html) {
            console.error("html is not defined")
            return false
        };

        const $ = cheerio.load(html);
        const element = $(selector);
        if (!element) return false;

        const text = element.text();
        if (!text) {
            console.error("Element has no text")
            return false;
        }

        environment.setOutput("Extracted text", text);

        return true;

    } catch (error) {
        console.error(error);
        return false;
    }

}