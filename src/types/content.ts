export interface SiteConfig {
  name: string;
  title: string;
  location: string;
  email: string;
  canonicalUrl: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadClient: string;
  heroSubheadEmployer: string;
  role: string;
  description: string;
  ogImage: string;
  formspreeEndpoint: string;
  quote: string;
  social: SocialLink[];
  skills: string[];
  aboutParagraphs: string[];
  beyondCode: BeyondCodeItem[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface BeyondCodeItem {
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

export interface ClientProject {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  embedUrl?: string;
  status?: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
  date: string;
  tags: string[];
  tier: "featured" | "archive";
  demoNote?: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  body: string;
  image: string;
}
