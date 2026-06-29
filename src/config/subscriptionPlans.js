export const LAUNCH_DISCOUNT_PERCENT = 10;

export const CURRENCIES = {
  INR: { symbol: "₹", locale: "en-IN", label: "INR (₹)", usd: false },
  USD: { symbol: "$", locale: "en-US", label: "USD ($)", usd: true },
};

export const SUBSCRIPTION_PLANS = {
  free_trial: {
    planType: "free_trial",
    name: "Free Trial",
    priceInr: 0,
    priceUsd: 0,
    pricePerEmployeeInr: 0,
    pricePerEmployeeUsd: 0,
    durationDays: 7,
    maxEmployees: 4,
    autoRenewPriceInr: 499,
    autoRenewPriceUsd: 9,
    autoRenewPlanName: "Starter",
  },
  starter_pack: {
    planType: "starter_pack",
    name: "Starter",
    priceInr: 499,
    priceUsd: 9,
    pricePerEmployeeInr: 51,
    pricePerEmployeeUsd: 1,
    durationDays: 30,
    maxEmployees: 6,
  },
  premium: {
    planType: "premium",
    name: "Growth",
    priceInr: 999,
    priceUsd: 19,
    pricePerEmployeeInr: 51,
    pricePerEmployeeUsd: 1,
    durationDays: 30,
    maxEmployees: 16,
  },
  enterprise: {
    planType: "enterprise",
    name: "Enterprise",
    priceInr: 1499,
    priceUsd: 39,
    pricePerEmployeeInr: 51,
    pricePerEmployeeUsd: 1,
    durationDays: 30,
    maxEmployees: 26,
  },
};

export const SUBSCRIPTION_ADDONS = {
  extra_employee: {
    itemType: "extra_employee",
    name: "Extra Employee Seat",
    priceInr: 51,
    priceUsd: 1,
  },
  custom_feature: {
    itemType: "custom_feature",
    name: "Custom Feature",
    priceInr: 2500,
    priceUsd: 30,
  },
};

export const formatPrice = (amount, currency = "INR") => {
  const cfg = CURRENCIES[currency] || CURRENCIES.INR;
  const formatted = Number(amount).toLocaleString(cfg.locale);
  return `${cfg.symbol}${formatted}`;
};

export const getDiscountedPrice = (amount) =>
  Math.round(amount * (1 - LAUNCH_DISCOUNT_PERCENT / 100) * 100) / 100;

export const formatDiscountedPrice = (amount, currency = "INR") => {
  const cfg = CURRENCIES[currency] || CURRENCIES.INR;
  const discounted = getDiscountedPrice(amount).toLocaleString(cfg.locale, {
    minimumFractionDigits: cfg.usd ? 2 : 0,
    maximumFractionDigits: cfg.usd ? 2 : 0,
  });
  return `${cfg.symbol}${discounted}`;
};

export const PRICING_TAGLINE_INR =
  "ORGA — from ₹499/month for up to 6 employees, scaling to ₹1,499/month for up to 26 employees";

export const PRICING_TAGLINE_USD =
  "ORGA — from $9/month for up to 6 employees, scaling to $39/month for up to 26 employees";

export const TRIAL_NOTE_INR =
  "7-day free trial · up to 4 employees · extra employee seats at ₹51 each · custom features from ₹2,500";

export const TRIAL_NOTE_USD =
  "7-day free trial · up to 4 employees · extra employee seats at $1 each · custom features from $30";

export const PRICING_TAGLINE = PRICING_TAGLINE_INR;
export const TRIAL_NOTE = TRIAL_NOTE_INR;

export const getPaidPlans = () =>
  [SUBSCRIPTION_PLANS.starter_pack, SUBSCRIPTION_PLANS.premium, SUBSCRIPTION_PLANS.enterprise];

export const getPriceKey = (currency) => currency === "USD" ? "priceUsd" : "priceInr";
export const getPerEmployeePriceKey = (currency) => currency === "USD" ? "pricePerEmployeeUsd" : "pricePerEmployeeInr";
