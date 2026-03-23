

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  gradient?: string;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring and small personal projects.",
    features: [
      "5 workflows",
      "100 executions/month",
      "Basic nodes",
      "Community support",
      "JSON export",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For teams who need power and reliability at scale.",
    features: [
      "Unlimited workflows",
      "10,000 executions/month",
      "AI-powered prompts",
      "Priority support",
      "All export formats",
      "Webhook integrations",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    popular: true,
    gradient: "from-violet-600 to-purple-600",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "Custom plans for large-scale data operations.",
    features: [
      "Everything in Pro",
      "Unlimited executions",
      "Custom nodes & plugins",
      "Dedicated support",
      "SSO & SAML",
      "SLA guarantee",
      "On-premise option",
      "Advanced analytics",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];
