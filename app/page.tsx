import Link from "next/link";
import styles from "./home.module.css";

function Page() {
  return (
    <div className={styles.asymmetric}>
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.neon}>Hello, I am Tim Leonard</h1>
          <p className={styles.info}>
            Find me on{" "}
            <Link
              href="https://github.com/iamtimleonard"
              className={styles.outsideLink}
            >
              GitHub
            </Link>{" "}
            and{" "}
            <Link
              href="https://www.linkedin.com/in/timothy-leonard-pa/"
              className={styles.outsideLink}
            >
              LinkedIn
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

export default Page;
