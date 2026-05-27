import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <>
      <Seo title="Not found" description="Page not found." />
      <div className={`section ${styles.page}`}>
        <div className="container">
          <h1 className="section-title">404</h1>
          <p className={styles.text}>This page doesn&apos;t exist.</p>
          <Link to="/" className="btn btn-primary">
            Go home
          </Link>
        </div>
      </div>
    </>
  );
}
