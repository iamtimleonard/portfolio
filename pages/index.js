import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Expire from "../components/Expire";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tim Leonard | JS Developer</title>
        <meta name="description" content="Tim Leonard is a JS developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Expire order={1}>
          <h1>My Name is Tim Leonard.</h1>
        </Expire>
        <Expire order={2}>
          <h1>Welcome to my porfolio.</h1>
        </Expire>
        <h1>More to come.</h1>
        <div className="grid">
          <div className="card">
            <a href="https://github.com/iamtimleonard">
              <h2 className="title">My GitHub</h2>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
