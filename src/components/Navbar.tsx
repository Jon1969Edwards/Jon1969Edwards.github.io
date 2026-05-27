import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import site from "../content/site.json";
import type { SiteConfig } from "../types/content";
import styles from "./Navbar.module.css";

const config = site as SiteConfig;

type NavItem =
  | { label: string; section: string }
  | { label: string; path: string };

const navItems: NavItem[] = [
  { label: "Work", section: "work" },
  { label: "About", section: "about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", section: "contact" },
];

function sectionHref(section: string, onHomePage: boolean) {
  return onHomePage ? `#${section}` : `/#${section}`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHomePage = location.pathname === "/";

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} onClick={() => setOpen(false)}>
          {config.name}
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className={styles.bars} aria-hidden />
        </button>

        <nav
          id="main-nav"
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
          aria-label="Main"
        >
          {navItems.map((item) =>
            "path" in item ? (
              <Link
                key={item.path}
                to={item.path}
                className={styles.link}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.section}
                href={sectionHref(item.section, onHomePage)}
                className={styles.link}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
