import { useState } from "react";
import clients from "../content/clients.json";
import projects from "../content/projects.json";
import type { ClientProject, Project } from "../types/content";
import ProjectCard from "./ProjectCard";
import styles from "./Work.module.css";

const clientList = clients as ClientProject[];
const projectList = projects as Project[];
const featured = projectList.filter((p) => p.tier === "featured");
const archive = projectList.filter((p) => p.tier === "archive");

export default function Work() {
  const [archiveOpen, setArchiveOpen] = useState(false);

  return (
    <section
      id="work"
      className={`section section-alt ${styles.work}`}
      aria-labelledby="work-heading"
    >
      <div className="container">
        <h2 id="work-heading" className="section-title">
          Work
        </h2>
        <p className="section-subtitle">
          Client projects and recent builds — for employers and freelance clients.
        </p>

        <h3 className={styles.groupTitle}>Client projects</h3>
        <div className={styles.clients}>
          {clientList.map((client) => (
            <article key={client.id} className={styles.clientCard}>
              {client.image && (
                <div className={styles.clientMedia}>
                  {client.url ? (
                    <a href={client.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={client.image}
                        alt=""
                        loading="lazy"
                        className={styles.clientImage}
                      />
                    </a>
                  ) : (
                    <img
                      src={client.image}
                      alt=""
                      loading="lazy"
                      className={styles.clientImage}
                    />
                  )}
                </div>
              )}
              {client.embedUrl && (
                <div className={styles.embedWrap}>
                  <iframe
                    src={client.embedUrl}
                    title={client.title}
                    loading="lazy"
                    allowFullScreen
                    className={styles.embed}
                  />
                </div>
              )}
              <div className={styles.clientBody}>
                <h4 className={styles.clientTitle}>{client.title}</h4>
                {client.status && (
                  <span className={styles.status}>{client.status}</span>
                )}
                <p>{client.description}</p>
                <div className={styles.tags}>
                  {client.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                {client.url && (
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Visit site
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {featured.length > 0 && (
          <>
            <h3 className={styles.groupTitle}>Featured projects</h3>
            <div className={styles.grid}>
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} variant="light" />
              ))}
            </div>
          </>
        )}

        {archive.length > 0 && (
          <div className={styles.archiveSection}>
            <button
              type="button"
              className={styles.archiveToggle}
              aria-expanded={archiveOpen}
              onClick={() => setArchiveOpen((v) => !v)}
            >
              {archiveOpen ? "Hide" : "Show"} bootcamp archive ({archive.length}{" "}
              projects)
            </button>
            {archiveOpen && (
              <div className={styles.grid}>
                {archive.map((project) => (
                  <ProjectCard key={project.id} project={project} variant="light" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
