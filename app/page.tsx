"use client";

import styles from "./home.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { IconContext } from "react-icons";
import Link from "next/link";
import Image from "next/image";
import encompassLogo from "../public/logo-encompass.gif";
import epoxyLogo from "../public/epoxy.jpeg";

function Page() {
  return (
    <IconContext.Provider value={{ className: styles.reactIcons }}>
      <main className={styles.gridContainer}>
        <div className={`${styles.nameCard} ${styles.card}`}>
          <article>
            <h1>Hello, I am Tim Leonard 🚀</h1>
            <p>This portfolio is under construction</p>
          </article>
          <footer>
            <a href="https://github.com/iamtimleonard">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/timothy-leonard-pa">
              <FaLinkedin />
            </a>
          </footer>
        </div>
        <div className={`${styles.skillCard} ${styles.card}`}>
          <article>
            <figure>
              <figcaption>my skills:</figcaption>
              <ul>
                <li>Node.js</li>
                <li>AWS</li>
                <li>MongoDB</li>
                <li>Redis</li>
                <li>React</li>
                <li>Ember</li>
                <li>Svelte</li>
              </ul>
            </figure>
          </article>
        </div>
        <div className={`${styles.bioCard} ${styles.card}`}>
          <article>
            <p>
              I am a web developer with more than three years of professional
              experience, specializing in building dynamic, scalable web
              applications.
            </p>
            <p>
              I first started working at 21PSTEM, an education-focused
              non-profit in the Philadelphia area, where I coordinated with math
              educators to develop technologies to foster student colaboration
              in the learning process. Currently, I am part of the team at
              epoxy.ai, where I help develop cutting-edge technology in the
              sports betting space.
            </p>
            <p>
              With a passion for problem-solving and a focus on delivering
              efficient, user-friendly applications, I thrive in dynamic
              environments that encourage growth and learning.
            </p>
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
          </article>
        </div>
        <div className={`${styles.card} ${styles.pstem}`}>
          <header>
            <Image src={encompassLogo} alt="logo" />
          </header>
          <article>
            <p>
              At{" "}
              <Link href="https://www.21pstem.org/" target="">
                21PSTEM
              </Link>
              , I worked on a project called EnCOMPASS, which fell under the
              purview of{" "}
              <Link href="https://mathematicalthinking.org/">
                Mathematical Thinking
              </Link>
              . The purpose of the project is to encourage student collaboration
              in the learning process. When using the app, students are able to
              view one anothers' math work and leave comments for each other.
            </p>
            <p>
              As the sole developer on this legacy project, it was my
              responsibility to define features, architect solutions, and to
              assign priority to stakeholder requests. My main efforts there
              were:
            </p>
            <ul>
              <li>
                update the legacy codebase to modern JavaScript, including
                migrating to Ember 3
              </li>
              <li>improve the main dashboard UI</li>
              <li>develop a set of data visualizations for instructors</li>
            </ul>
            <p>I learned a ton during my time at 21PSTEM.</p>
          </article>
        </div>
        <div className={`${styles.card} ${styles.epoxy}`}>
          <header>
            <Image src={epoxyLogo} alt="epoxy.ai logo" width={100} />
          </header>
          <article>
            <p>
              I am currently a full stack developer at{" "}
              <Link href="https://epoxy.ai" target="">
                Epoxy.ai
              </Link>
              , where I work on a suite of tools for the sports betting
              industry. During my time at Epoxy, I have grown familiar with
              using AWS to architect serverless applications.
            </p>
          </article>
        </div>
        <div className={`${styles.miscCard} ${styles.card}`}>
          <header>
            <h3>Other Projects</h3>
          </header>
          <article>
            <ul>
              <li>
                <Link href="/games">Games</Link>
              </li>
              <li>
                <Link href="https://border-radius.iamtimleonard.vercel.app/">
                  Border Radius Previewer
                </Link>
              </li>
              <li>
                <Link href="https://quiz-app-iamtimleonard.vercel.app/">
                  Quiz App
                </Link>
              </li>
            </ul>
          </article>
        </div>
      </main>
    </IconContext.Provider>
  );
}

export default Page;
