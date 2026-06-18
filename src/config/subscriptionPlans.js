export const SUBSCRIPTION_PLANS = {
  free_trial: {
    planType: "free_trial",
    name: "Free Trial",
    priceInr: 0,
    pricePerEmployeeInr: 0,
    durationDays: 7,
    maxEmployees: 4,
    autoRenewPriceInr: 2999,
    autoRenewPlanName: "Growth",
  },
  starter_pack: {
    planType: "starter_pack",
    name: "Growth",
    priceInr: 2999,
    pricePerEmployeeInr: 60,
    durationDays: 30,
    maxEmployees: 50,
  },
  premium: {
    planType: "premium",
    name: "Business",
    priceInr: 4999,
    pricePerEmployeeInr: 100,
    durationDays: 30,
    maxEmployees: 50,
  },
};

export const formatInr = (amount) =>
  `₹${Number(amount).toLocaleString("en-IN")}`;

export const PRICING_TAGLINE =
  "SUHTech ORGA — from ₹2,999/month for up to 50 employees (~₹60/employee)";

export const TRIAL_NOTE =
  "7-day free trial · up to 4 employees · then auto-renews at ₹2,999/month";

export const getPaidPlans = () =>
  [SUBSCRIPTION_PLANS.starter_pack, SUBSCRIPTION_PLANS.premium];
