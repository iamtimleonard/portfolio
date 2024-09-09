import Image from "next/image";
import styles from "./home.module.css";

function Page() {
  return (
    <main className={styles.gridContainer}>
      <div className={`${styles.nameCard} ${styles.card}`}>
        <h1>Hello, I am Tim Leonard 🚀</h1>
      </div>
      <div className={`${styles.skillCard} ${styles.card}`}>
        <ul>
          <li>skill</li>
          <li>skill</li>
          <li>skill</li>
        </ul>
      </div>
      <div className={`${styles.contactCard} ${styles.card}`}>
        <a href="https://github.com/iamtimleonard">
          <Image src="/github-mark.svg" alt="Github" width={50} height={50} />
        </a>
        <a href="https://www.linkedin.com/in/timothy-leonard-pa">
          <Image src="/LI-Logo.png" alt="LinkedIn" width={50} height={50} />
        </a>
      </div>
      <div className={`${styles.bioCard} ${styles.card}`}>
        <p>
          This is a biography of me. It could be boring. It could be
          interesting. What else can I say?
        </p>
      </div>
      <div className={`${styles.miscCard} ${styles.card}`}>
        <p>gonna be other stuff here</p>
      </div>
    </main>
  );
}

export default Page;
