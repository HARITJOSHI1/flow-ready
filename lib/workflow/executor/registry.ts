import { ExcutorEnvironment } from "@/actions/execution/types";
import { Task, TaskType } from "@/lib/types/tasks";
import { LaunchBrowserExecutor } from "./launch-browser-executor";
import { PageToHtmlExecutor } from "./page-to-html-executor";
import { ExtractTextFromElementExecutor } from "./extract-text-frm-element";


type ExecutorFunction<T extends Task> = (environment: ExcutorEnvironment<T>) => Promise<boolean>;

type RegistryExecutor = {
    [key in TaskType]: ExecutorFunction<Task>;
}

export const ExecutorRegistry: RegistryExecutor = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
}