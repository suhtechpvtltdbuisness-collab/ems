const VISITOR_ID_KEY = "vt_visitor_id";
const SESSION_ID_KEY = "vt_session_id";
const SESSION_TS_KEY = "vt_session_ts";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

const API_BASE = "/api";
const TRACKING_ENABLED = import.meta.env.VITE_VISITOR_TRACKING_ENABLED !== "false";

const PAGE_EVENTS = {
  "/": "page_view",
  "/pricing": "pricing_view",
  "/contact": "contact_view",
  "/demo": "contact_view",
  "/hrms": "services_view",
  "/project-management": "services_view",
  "/finance-mgmt": "services_view",
  "/solutions": "services_view",
  "/support": "contact_view",
  "/auth": "form_start",
};

function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function getVisitorId() {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = "v_" + uuid();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function getOrCreateSession() {
  const now = Date.now();
  const lastTs = Number(localStorage.getItem(SESSION_TS_KEY) || "0");
  let sessionId = localStorage.getItem(SESSION_ID_KEY);

  if (!sessionId || now - lastTs > SESSION_TIMEOUT_MS) {
    sessionId = "s_" + uuid();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  localStorage.setItem(SESSION_TS_KEY, String(now));
  return sessionId;
}

function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
  let browser = "unknown";
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Edge")) browser = "Edge";

  let os = "unknown";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  return { type: isMobile ? "mobile" : "desktop", browser, os };
}

function getUTMs() {
  const p = new URLSearchParams(window.location.search);
  return {
    source: p.get("utm_source") || undefined,
    medium: p.get("utm_medium") || undefined,
    campaign: p.get("utm_campaign") || undefined,
    term: p.get("utm_term") || undefined,
    content: p.get("utm_content") || undefined,
  };
}

async function post(path, body) {
  if (!TRACKING_ENABLED) return;
  try {
    await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {
    // Tracking must never break the site
  }
}

let _eventQueue = [];
let _flushTimer = null;

function flushEvents() {
  if (_eventQueue.length === 0) return;
  const batch = _eventQueue.splice(0, _eventQueue.length);
  post("/visitors/events", {
    visitorId: getVisitorId(),
    sessionId: getOrCreateSession(),
    events: batch,
  });
}

function enqueueEvent(eventName, pageUrl, metadata) {
  _eventQueue.push({
    eventName,
    pageUrl,
    metadata: { site: "ems", ...metadata },
    ts: new Date().toISOString(),
  });
  if (_flushTimer) clearTimeout(_flushTimer);
  _flushTimer = setTimeout(flushEvents, 2000);
}

let _initialized = false;
let _lastPageUrl = null;

export function initTracking() {
  if (_initialized || !TRACKING_ENABLED) return;
  _initialized = true;

  post("/visitors/identify", {
    visitorId: getVisitorId(),
    sessionId: getOrCreateSession(),
    pageUrl: window.location.href,
    referrer: document.referrer || undefined,
    utm: getUTMs(),
    device: getDeviceInfo(),
  });

  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushEvents();
  });
}

export function trackPageView(pageUrl) {
  if (!TRACKING_ENABLED) return;
  const url = pageUrl || window.location.href;
  if (url === _lastPageUrl) return;
  _lastPageUrl = url;

  const pathname = new URL(url, window.location.origin).pathname.replace(/\/$/, "") || "/";
  enqueueEvent("page_view", url, { pathname, site: "ems" });

  const named = PAGE_EVENTS[pathname];
  if (named && named !== "page_view") {
    enqueueEvent(named, url, { pathname, site: "ems" });
  }
}

export function trackEvent(eventName, metadata) {
  if (!TRACKING_ENABLED) return;
  enqueueEvent(eventName, window.location.href, metadata);
}

export async function linkUserToVisitor() {
  if (!TRACKING_ENABLED) return;
  const token = localStorage.getItem("authToken");
  if (!token) return;
  try {
    await fetch(`${API_BASE}/visitors/link-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ visitorId: getVisitorId() }),
    });
  } catch {
    // non-critical
  }
}
