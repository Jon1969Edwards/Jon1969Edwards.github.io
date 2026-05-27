import { useEffect } from "react";
import site from "../content/site.json";
import type { SiteConfig } from "../types/content";

const config = site as SiteConfig;

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({
  title,
  description = config.description,
  path = "",
}: SeoProps) {
  const fullTitle = title ? `${title} | ${config.name}` : `${config.name} — ${config.title}`;
  const url = `${config.canonicalUrl}${path}`;
  const ogImage = `${config.canonicalUrl}${config.ogImage}`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:type", "website", true);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", url, true);
    setMeta("og:image", ogImage, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
  }, [fullTitle, description, url, ogImage]);

  return null;
}
