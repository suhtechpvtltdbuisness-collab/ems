export const LAUNCH_DISCOUNT_PERCENT = 10;

export const SUBSCRIPTION_PLANS = {
  free_trial: {
    planType: "free_trial",
    name: "Free Trial",
    priceUsd: 0,
    pricePerEmployeeUsd: 0,
    durationDays: 7,
    maxEmployees: 4,
    autoRenewPriceUsd: 4,
    autoRenewPlanName: "Starter",
  },
  starter_pack: {
    planType: "starter_pack",
    name: "Starter",
    priceUsd: 4,
    pricePerEmployeeUsd: 1,
    durationDays: 30,
    maxEmployees: 6,
  },
  premium: {
    planType: "premium",
    name: "Growth",
    priceUsd: 6,
    pricePerEmployeeUsd: 1,
    durationDays: 30,
    maxEmployees: 16,
  },
  enterprise: {
    planType: "enterprise",
    name: "Enterprise",
    priceUsd: 10,
    pricePerEmployeeUsd: 1,
    durationDays: 30,
    maxEmployees: 26,
  },
};

export const SUBSCRIPTION_ADDONS = {
  extra_employee: {
    itemType: "extra_employee",
    name: "Extra Employee Seat",
    priceUsd: 1,
  },
  custom_feature: {
    itemType: "custom_feature",
    name: "Custom Feature",
    priceUsd: 30,
  },
};

export const formatUsd = (amount) =>
  `$${Number(amount).toLocaleString("en-US")}`;

export const getDiscountedPrice = (amount) =>
  Math.round(amount * (1 - LAUNCH_DISCOUNT_PERCENT / 100) * 100) / 100;

export const formatDiscountedUsd = (amount) =>
  `$${getDiscountedPrice(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const PRICING_TAGLINE =
  "ORGA — from $4/month for up to 6 employees, scaling to $10/month for up to 26 employees";

export const TRIAL_NOTE =
  "7-day free trial · up to 4 employees · extra employee seats at $1 each · custom features from $30";

export const getPaidPlans = () =>
  [SUBSCRIPTION_PLANS.starter_pack, SUBSCRIPTION_PLANS.premium, SUBSCRIPTION_PLANS.enterprise];
