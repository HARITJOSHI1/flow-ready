import { Environment } from "../types";

export const cleanupEnvironment = async (env: Environment) => {
    if (env.browser) await env.browser.close().catch((err) => console.error("cannot close browser, reason:", err));
}