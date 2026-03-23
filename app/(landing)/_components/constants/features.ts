import {
  Globe,
  Zap,
  Brain,
  Shield,
  BarChart3,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
};

export const features: Feature[] = [
  {
    icon: Globe,
    title: "Browser Automation",
    description:
      "Launch headless browsers, navigate pages, and interact with any website—all through intuitive visual nodes.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast Extraction",
    description:
      "Extract structured data from any web page in seconds with AI-powered selectors that adapt automatically.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Brain,
    title: "AI-Powered Prompts",
    description:
      "Use natural language prompts to define your scraping logic. No CSS selectors or XPath—just describe what you need.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "End-to-end encryption, SOC 2 compliance, and granular access controls to keep your data safe.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Monitor workflow execution, track success rates, and get instant alerts on failures with rich dashboards.",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    icon: Workflow,
    title: "Visual Workflow Builder",
    description:
      "Drag-and-drop nodes to build complex scraping pipelines. Connect, transform, and export data visually.",
    gradient: "from-indigo-400 to-violet-500",
  },
];
