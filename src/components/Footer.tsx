import site from "../content/site.json";
import type { SiteConfig } from "../types/content";
import styles from "./Footer.module.css";

const config = site as SiteConfig;
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} {config.name}. {config.location}.
        </p>
        <ul className={styles.social}>
          {config.social.map((item) => (
            <li key={item.url}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
