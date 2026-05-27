import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import styles from "./Blog.module.css";

export default function Blog() {
  return (
    <>
      <Seo
        title="Blog"
        description="Notes on game development, web, and tinkering."
        path="/blog"
      />
      <div className={`section ${styles.page}`}>
        <div className="container">
          <h1 className="section-title">Blog</h1>
          <p className={styles.empty}>
            Posts are coming soon. I&apos;m setting up this space for notes on game dev,
            web projects, and side experiments.
          </p>
          <p>
            <Link to="/" className="btn btn-secondary">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
