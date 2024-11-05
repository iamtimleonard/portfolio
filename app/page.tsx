import Link from "next/link";
import styles from "./home.module.css";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"] });

function Page() {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.neon} ${orbitron.className}`}>
        Hello, I am Tim Leonard
      </h1>
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
  );
}

export default Page;
