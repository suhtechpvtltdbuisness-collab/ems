export const trackEvent = (eventName, params = {}) => {
  try {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", eventName, params);
  } catch {
    // Analytics must never interrupt the application flow.
  }
};

export const trackPageView = (pageName) => {
  if (!pageName) return;
  trackEvent(`view_${pageName}`);
};

export const trackBookDemo = (location) => {
  trackEvent("click_book_demo", { location });
};

const GOOGLE_ADS_ID = import.meta.env.VITE_GA_ID?.trim() || "AW-18162068249";
const GOOGLE_ADS_CONVERSION_LABEL =
  import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL?.trim() ||
  "A4QtCJzTs9AcEJnWrNRD";

export const trackSubscribeConversion = (value = 1.0, currency = "INR") => {
  trackEvent("conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
    value: Number(value) || 1.0,
    currency,
  });
};
