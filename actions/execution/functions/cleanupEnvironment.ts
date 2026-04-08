import { Environment } from "../types/executionEnv";

export const cleanupEnvironment = async (env: Environment) => {
    if (env.browser) await env.browser.close().catch((err) => console.error("cannot close browser, reason:", err));
}