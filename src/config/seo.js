export const SITE_NAME = "Orga";

export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://orga.cc";

export const DEFAULT_DESCRIPTION =
  "Orga is an all-in-one platform for project management, HRMS, finance, and team collaboration. Plan tasks, track attendance, manage budgets, and grow your business from one dashboard.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/Orga%20Logo.svg`;

export const ROUTE_SEO = {
  "/": {
    title: "Orga — Manage Team, Tasks & Projects in One Place",
    description: DEFAULT_DESCRIPTION,
  },
  "/solutions": {
    title: "Solutions — Orga",
    description:
      "Explore Orga solutions for hiring, attendance, shifts, leave, payroll, performance, employees, finance, and business operations.",
  },
  "/solutiondedipages": {
    title: "Project Organizer — Orga",
    description:
      "Organize projects, backlogs, and team events with Orga's project organizer tools.",
  },
  "/project-management": {
    title: "Project Management — Orga",
    description:
      "Plan projects, track milestones, and deliver on time with Orga's project management suite.",
  },
  "/finance-mgmt": {
    title: "Finance Management — Orga",
    description:
      "Track expenses, invoices, and budgets with Orga's integrated finance management tools.",
  },
  "/hrms": {
    title: "HRMS — Orga",
    description:
      "Manage employees, attendance, leave, and onboarding with Orga's HRMS module.",
  },
  "/support": {
    title: "Support — Orga",
    description:
      "Resolve tickets and internal issues faster with Orga's built-in support system.",
  },
  "/demo": {
    title: "Book a Demo — Orga",
    description:
      "See how Orga helps teams manage projects, people, and finances in one platform.",
  },
  "/contact": {
    title: "Contact Us — Orga",
    description:
      "Get in touch with the Orga team for sales, support, or partnership inquiries.",
  },
  "/pricing": {
    title: "Pricing — Orga",
    description:
      "Compare Orga plans and start your free trial for project management, HRMS, and finance.",
  },
  "/privacy": {
    title: "Privacy Policy — Orga",
    description: "Read how Orga collects, uses, and protects your personal information.",
  },
  "/terms": {
    title: "Terms of Service — Orga",
    description: "Review the terms and conditions for using the Orga platform.",
  },
  "/auth": {
    title: "Sign In — Orga",
    description: "Sign in or create your Orga account to manage your team and projects.",
    noindex: true,
  },
  "/verify-email": {
    title: "Verify Email — Orga",
    description: "Verify your email address to activate your Orga account.",
    noindex: true,
  },
  "/onboarding": {
    title: "Onboarding — Orga",
    description: "Complete your Orga account setup.",
    noindex: true,
  },
  "/employee-details": {
    title: "Employee Details — Orga",
    description: "View and manage employee profile information.",
    noindex: true,
  },
};
