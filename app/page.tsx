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
          <li>Node.js</li>
          <li>AWS</li>
          <li>MongoDB</li>
          <li>Redis</li>
          <li>React</li>
          <li>Ember</li>
          <li>Svelte</li>
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
          I am a web developer with more than three years of professional
          experience, specializing in building dynamic, scalable web
          applications.
        </p>
        <p>
          I first started working at 21PSTEM, an education-focused non-profit in
          the Philadelphia area, where I coordinated with math educators to
          develop technologies to foster student colaboration in the learning
          process. Currently, I am part of the team at epoxy.ai, where I help
          develop cutting-edge technology in the sports betting space.
        </p>
        <p>
          With a passion for problem-solving and a focus on delivering
          efficient, user-friendly applications, I thrive in dynamic
          environments that encourage growth and learning.
        </p>
      </div>
      <div className={`${styles.miscCard} ${styles.card}`}>
        <figure>
          <figcaption>I have other interests like:</figcaption>
          <ul>
            <li>mycology</li>
            <li>rock climbing</li>
            <li>shape note singing</li>
            <li>sewing</li>
            <li>fermentation</li>
            <li>food</li>
          </ul>
        </figure>
      </div>
    </main>
  );
}

export default Page;
