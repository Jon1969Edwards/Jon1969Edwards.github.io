import site from "../content/site.json";
import timeline from "../content/timeline.json";
import type { SiteConfig, TimelineEntry } from "../types/content";
import styles from "./About.module.css";

const config = site as SiteConfig;
const entries = timeline as TimelineEntry[];

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`} aria-labelledby="about-heading">
      <div className="container">
        <h2 id="about-heading" className="section-title">
          About
        </h2>
        <p className="section-subtitle">
          Developer, tinkerer, and lifelong learner — open to freelance and full-time opportunities.
        </p>

        <div className={styles.prose}>
          {config.aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <h3 className={styles.subheading}>Timeline</h3>
        <ol className={styles.timeline}>
          {entries.map((entry) => (
            <li key={entry.period} className={styles.timelineItem}>
              <img
                src={entry.image}
                alt=""
                className={styles.timelineImage}
                width={80}
                height={80}
                loading="lazy"
              />
              <div className={styles.timelineContent}>
                <span className={styles.period}>{entry.period}</span>
                <h4 className={styles.timelineTitle}>{entry.title}</h4>
                <p>{entry.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <h3 className={styles.subheading}>Beyond code</h3>
        <ul className={styles.beyond}>
          {config.beyondCode.map((item) => (
            <li key={item.title} className={styles.beyondItem}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.linkLabel}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
