export type FAQ = {
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    question: "What is FastFlow and how does it work?",
    answer:
      "FastFlow is a visual workflow builder for web scraping and browser automation. You create workflows by connecting drag-and-drop nodes on a canvas—each node performs an action like launching a browser, navigating to a page, extracting data, or transforming content. No coding required.",
  },
  {
    question: "Do I need programming knowledge to use FastFlow?",
    answer:
      "Not at all! FastFlow is designed for both technical and non-technical users. The visual builder and AI-powered prompts let you describe what data you need in plain English. However, developers can also leverage custom scripts and API integrations for advanced use cases.",
  },
  {
    question: "How does the AI-powered prompt feature work?",
    answer:
      "Simply describe what data you want to extract in natural language—for example, 'Get all product prices and titles from this page.' Our AI interprets your intent, identifies the correct elements, and generates the extraction logic automatically. It adapts even when page structures change.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes! Our Starter plan is completely free and includes 5 workflows with 100 executions per month. It's perfect for personal projects, testing, and getting familiar with the platform before upgrading.",
  },
  {
    question: "Can I integrate FastFlow with my existing tools?",
    answer:
      "Absolutely. FastFlow supports webhook integrations, REST API endpoints, and exports to JSON, CSV, and more. You can pipe data directly into Slack, Google Sheets, databases, or any tool that accepts webhook payloads.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Starter users get access to our community forum and documentation. Pro users receive priority email support with 24-hour response times. Enterprise customers get dedicated account managers and SLA-guaranteed support.",
  },
];
