import site from "../content/site.json";
import type { SiteConfig } from "../types/content";
import styles from "./Hero.module.css";

const config = site as SiteConfig;

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.bg} aria-hidden />
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>
              {config.location} · {config.role}
            </p>
            <h1 id="hero-heading" className={styles.headline}>
              Game &amp; web developer
              <span className={styles.headlineAccent}>who loves to tinker</span>
            </h1>
            <p className={styles.tagline}>{config.tagline}</p>
          </div>

          {/* Keeps “Programmer Found!” in the background image visible */}
          <div className={styles.bubbleLane} aria-hidden />

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

          <div className={styles.pitch}>
            <p>{config.heroSubheadClient}</p>
            <p>{config.heroSubheadEmployer}</p>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.photoFrame}>
            <img
              src="/img/profile2.jpg"
              alt="Portrait of Jonathan C. Edwards"
              className={styles.photo}
              width={240}
              height={240}
            />
          </div>
          <blockquote className={styles.quote}>{config.quote}</blockquote>
        </div>
      </div>
    </section>
  );
}
