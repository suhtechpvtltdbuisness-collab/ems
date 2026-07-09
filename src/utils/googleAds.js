const ADSENSE_SCRIPT_ID = "google-adsense-script";
const ADSENSE_META_NAME = "google-adsense-account";

export const initializeGoogleAds = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const client = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT?.trim();
  if (!client) {
    return;
  }

  if (!document.querySelector(`meta[name="${ADSENSE_META_NAME}"]`)) {
    const meta = document.createElement("meta");
    meta.name = ADSENSE_META_NAME;
    meta.content = client;
    document.head.appendChild(meta);
  }

  if (document.getElementById(ADSENSE_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;

  document.head.appendChild(script);
};
