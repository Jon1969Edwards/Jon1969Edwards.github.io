import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import site from "../content/site.json";
import type { SiteConfig } from "../types/content";
import styles from "./Navbar.module.css";

const config = site as SiteConfig;

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "Blog", route: true },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

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
          {navLinks.map((link) =>
            link.route ? (
              <Link
                key={link.href}
                to={link.href}
                className={styles.link}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={isHome ? link.href.replace("/", "") : link.href}
                className={styles.link}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
