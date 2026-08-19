export const CURRENCIES = {
  INR: { symbol: "₹", locale: "en-IN", label: "INR (₹)", usd: false },
  USD: { symbol: "$", locale: "en-US", label: "USD ($)", usd: true },
};

export const formatPrice = (amount, currency = "USD") => {
  const cfg = CURRENCIES[currency] || CURRENCIES.USD;
  const value = Number(amount) || 0;
  const formatted = value.toLocaleString(cfg.locale, {
    minimumFractionDigits: cfg.usd && value % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: cfg.usd ? 2 : 0,
  });
  return `${cfg.symbol}${formatted}`;
};

export const durationLabel = (days) => {
  const value = Number(days) || 0;
  if (value === 30) return "1 month";
  if (value === 1) return "1 day";
  return `${value} days`;
};

export const PRICING_TAGLINE =
  "1-month free trial · Up to 10 employees · $1/extra employee · starter plan available on request";

export const TRIAL_NOTE =
  "1-month free trial · Up to 10 employees · $1/extra employee · starter plan available on request";