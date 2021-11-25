import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import PortfolioDisplay from "../components/PortfolioDisplay";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tim Leonard | JS Developer</title>
        <meta name="description" content="Tim Leonard is a JS developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PortfolioDisplay />
      </main>
    </div>
  );
}
