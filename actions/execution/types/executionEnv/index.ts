import { Task } from "@/lib/types/tasks";
import { WorkflowExecutionPlan } from "@/lib/workflow/type";
import { Browser, Page } from "puppeteer";
import { LogCollector } from "../log";

export type CreateExecutionPlanInDBProps = {
    workflowId: string;
    userId: string;
    executionPlan: WorkflowExecutionPlan;
    flowDefination?: string;
};


export type Environment = {
    phases: {
        // node id will be used here as key
        [key: string]: {
            inputs: Record<string, string>;
            outputs: Record<string, string>;
        };
    };

    browser?: Browser;
    page?: Page;
};


export type ExcutorEnvironment<T extends Task> = {
    getInput: (inputName: T["inputs"][number]["name"]) => string;

    getBrowser: () => Browser | undefined;
    setBrowser: (browser: Browser) => void;

    getPage: () => Page | undefined;
    setPage: (page: Page) => void;
    setOutput: (name: T["outputs"][number]["name"], value: string) => void;
    log: LogCollector;
}
