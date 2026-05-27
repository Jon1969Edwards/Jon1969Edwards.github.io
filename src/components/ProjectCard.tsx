import type { Project } from "../types/content";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  variant?: "dark" | "light";
}

export default function ProjectCard({ project, variant = "dark" }: ProjectCardProps) {
  const card = (
    <article className={`${styles.card} ${variant === "light" ? styles.cardLight : ""}`}>
      <div className={styles.imageWrap}>
        <img src={project.image} alt="" className={styles.image} loading="lazy" />
        <div className={styles.hoverOverlay}>
          <span className={styles.hoverIcon} aria-hidden>
            +
          </span>
        </div>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>
        {project.demoNote && <p className={styles.note}>{project.demoNote}</p>}
        <div className={styles.meta}>
          <span className={styles.date}>{project.date}</span>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {card}
      </a>
    );
  }

  return card;
}
