export const SUBSCRIPTION_PLANS = {
  free_trial: {
    planType: "free_trial",
    name: "Free Trial",
    priceInr: 0,
    pricePerEmployeeInr: 0,
    durationDays: 7,
    maxEmployees: 4,
    autoRenewPriceInr: 299,
    autoRenewPlanName: "Starter",
  },
  starter_pack: {
    planType: "starter_pack",
    name: "Starter",
    priceInr: 299,
    pricePerEmployeeInr: 51,
    durationDays: 30,
    maxEmployees: 6,
  },
  premium: {
    planType: "premium",
    name: "Growth",
    priceInr: 499,
    pricePerEmployeeInr: 51,
    durationDays: 30,
    maxEmployees: 16,
  },
  enterprise: {
    planType: "enterprise",
    name: "Enterprise",
    priceInr: 799,
    pricePerEmployeeInr: 51,
    durationDays: 30,
    maxEmployees: 26,
  },
};

export const SUBSCRIPTION_ADDONS = {
  extra_employee: {
    itemType: "extra_employee",
    name: "Extra Employee Seat",
    priceInr: 51,
  },
  custom_feature: {
    itemType: "custom_feature",
    name: "Custom Feature",
    priceInr: 2500,
  },
};

export const formatInr = (amount) =>
  `₹${Number(amount).toLocaleString("en-IN")}`;

export const PRICING_TAGLINE =
  "ORGA — from ₹299/month for up to 6 employees, scaling to ₹799/month for up to 26 employees";

export const TRIAL_NOTE =
  "7-day free trial · up to 4 employees · extra employee seats at ₹51 each · custom features from ₹2,500";

export const getPaidPlans = () =>
  [SUBSCRIPTION_PLANS.starter_pack, SUBSCRIPTION_PLANS.premium, SUBSCRIPTION_PLANS.enterprise];
