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
