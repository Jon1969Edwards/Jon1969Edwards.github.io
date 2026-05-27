import site from "../content/site.json";
import type { SiteConfig } from "../types/content";
import styles from "./Hero.module.css";

const config = site as SiteConfig;

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{config.location} · {config.role}</p>
          <h1 id="hero-heading" className={styles.headline}>
            {config.heroHeadline}
          </h1>
          <p className={styles.tagline}>{config.tagline}</p>
          <p className={styles.dual}>{config.heroSubheadClient}</p>
          <p className={styles.dual}>{config.heroSubheadEmployer}</p>

          <ul className={styles.skills} aria-label="Skills">
            {config.skills.map((skill) => (
              <li key={skill}>
                <span className="tag">{skill}</span>
              </li>
            ))}
          </ul>

          <div className={styles.ctas}>
            <a href="#work" className="btn btn-primary">
              View work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get in touch
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <img
            src="/img/profile2.jpg"
            alt="Portrait of Jonathan C. Edwards"
            className={styles.photo}
            width={320}
            height={320}
          />
          <blockquote className={styles.quote}>{config.quote}</blockquote>
        </div>
      </div>
    </section>
  );
}
