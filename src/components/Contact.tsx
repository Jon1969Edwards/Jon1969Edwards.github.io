import { useState, type FormEvent } from "react";
import site from "../content/site.json";
import type { SiteConfig } from "../types/content";
import styles from "./Contact.module.css";

const config = site as SiteConfig;

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(config.formspreeEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className={`section ${styles.contact}`}
      aria-labelledby="contact-heading"
    >
      <div className={styles.bg} aria-hidden />
      <div className={`container ${styles.inner}`}>
        <h2 id="contact-heading" className="section-title">
          Contact
        </h2>
        <p className="section-subtitle">
          Freelance projects, contract work, or full-time roles — send a message and
          I&apos;ll get back to you.
        </p>

        <div className={styles.grid}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="First Name"
                type="text"
                required
                autoComplete="given-name"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="Last Name"
                type="text"
                required
                autoComplete="family-name"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
            {status === "success" && (
              <p className={styles.feedbackSuccess} role="status">
                Thanks! I&apos;ll get back to you as soon as possible.
              </p>
            )}
            {status === "error" && (
              <p className={styles.feedbackError} role="alert">
                Something went wrong. Try emailing me directly.
              </p>
            )}
          </form>

          <aside className={styles.info}>
            <p className={styles.name}>{config.name}</p>
            <p>{config.role}</p>
            <p>
              <a href={`mailto:${config.email}`}>{config.email}</a>
            </p>
            <p>{config.location}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
