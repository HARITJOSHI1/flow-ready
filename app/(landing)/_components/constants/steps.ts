export type Step = {
  number: string;
  title: string;
  description: string;
  accent: string;
  bg: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Design Your Workflow",
    description:
      "Drag nodes onto the canvas and connect them visually. Define your scraping pipeline with zero code—just point, click, and configure.",
    accent: "text-violet-500 dark:text-violet-400",
    bg: "bg-violet-500/15 dark:bg-violet-500/20",
  },
  {
    number: "02",
    title: "Configure AI Prompts",
    description:
      "Describe what data you need in plain English. Our AI interprets your intent and generates precise extraction logic automatically.",
    accent: "text-cyan-500 dark:text-cyan-400",
    bg: "bg-cyan-500/15 dark:bg-cyan-500/20",
  },
  {
    number: "03",
    title: "Run & Monitor",
    description:
      "Execute your workflow with a single click. Watch real-time logs, track progress per phase, and receive instant notifications.",
    accent: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/15 dark:bg-amber-500/20",
  },
  {
    number: "04",
    title: "Export & Integrate",
    description:
      "Export your extracted data in JSON, CSV, or pipe it directly into your existing tools via webhooks and API integrations.",
    accent: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/15 dark:bg-emerald-500/20",
  },
];
