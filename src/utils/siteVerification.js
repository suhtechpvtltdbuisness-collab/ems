export const initializeSiteVerification = () => {
  if (typeof document === "undefined") {
    return;
  }

  const verificationCode = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
  if (!verificationCode) {
    return;
  }

  const metaName = "google-site-verification";
  if (document.head.querySelector(`meta[name="${metaName}"]`)) {
    return;
  }

  const meta = document.createElement("meta");
  meta.name = metaName;
  meta.content = verificationCode;
  document.head.appendChild(meta);
};
