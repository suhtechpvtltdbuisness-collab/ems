import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  ROUTE_SEO,
  SITE_NAME,
  SITE_URL,
} from "../../config/seo.js";

const setMeta = (key, content, attribute = "name") => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

export default function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const routeMeta = ROUTE_SEO[pathname] || {};
    const title = routeMeta.title || `${SITE_NAME} — Team, Tasks & Project Management`;
    const description = routeMeta.description || DEFAULT_DESCRIPTION;
    const canonicalPath = pathname === "/" ? "" : pathname;
    const url = `${SITE_URL}${canonicalPath}`;
    const image = routeMeta.image || DEFAULT_OG_IMAGE;
    const robots = routeMeta.noindex ? "noindex, nofollow" : "index, follow";

    document.title = title;
    setMeta("description", description);
    setMeta("robots", robots);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:image", image, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    setLink("canonical", url);
  }, [pathname]);

  return null;
}
