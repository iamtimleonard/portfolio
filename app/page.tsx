"use client";

import styles from "./home.module.css";
import { DiMongodb } from "react-icons/di";
import {
  FaAws,
  FaEmber,
  FaGithub,
  FaLinkedin,
  FaNodeJs,
  FaReact,
} from "react-icons/fa6";
import { SiGit, SiRedis, SiSvelte } from "react-icons/si";
import { IconContext } from "react-icons";
import Link from "next/link";
import Image from "next/image";
import encompassLogo from "../public/logo-encompass.gif";
import epoxyLogo from "../public/epoxy.jpeg";
import { Fade } from "react-awesome-reveal";
import TypeIt from "typeit-react";

function Card({ styleReference, heading, children }) {
  return (
    <div className={styles.experiment}>
      <div className={styles.cardContainer}>
        {heading && (
          <div className={styles.headingThing}>
            <TypeIt
              as="h1"
              options={{
                waitUntilVisible: true,
              }}
            >
              {heading}
            </TypeIt>
          </div>
        )}
        <IconContext.Provider value={{ className: styles.reactIcons }}>
          <Fade>
            <div className={`${styles.card} ${styleReference}`}>{children}</div>
          </Fade>
        </IconContext.Provider>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className={styles.background}>
      <nav className={styles.nav}>
        <Link className={styles.navLink} href="#things-i-use">
          things i use
        </Link>
        <Link className={styles.navLink} href="#about-me">
          about me
        </Link>
        <Link className={styles.navLink} href="#21pstem">
          21pstem
        </Link>
        <Link className={styles.navLink} href="#epoxyai">
          epoxyai
        </Link>
      </nav>
      <main className={styles.mainContainer}>
        <Card styleReference={styles.nameCard} heading={""}>
          <article>
            <TypeIt
              as={"h1"}
              options={{
                cursor: false,
              }}
            >
              Hello, I am Tim Leonard 🚀
            </TypeIt>
          </article>
          <footer>
            <a href="https://github.com/iamtimleonard">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/timothy-leonard-pa">
              <FaLinkedin />
            </a>
          </footer>
        </Card>
        <Card styleReference={styles.skillCard} heading={"things i use"}>
          <article id="things-i-use">
            <ul>
              <li>
                <FaNodeJs title="Node.js" />
              </li>
              <li>
                <FaAws title="AWS" />
              </li>
              <li>
                <DiMongodb title="MongoDB" />
              </li>
              <li>
                <SiRedis title="Redis" />
              </li>
              <li>
                <FaReact title="React" />
              </li>
              <li>
                <FaEmber title="Ember" />
              </li>
              <li>
                <SiSvelte title="Svelte" />
              </li>
              <li>
                <SiGit title="Git" />
              </li>
            </ul>
          </article>
        </Card>
        <Card styleReference={styles.bioCard} heading={"about me"}>
          <article id="about-me">
            <p>
              I am a full stack developer with passion for learning new
              technologies and excited for the future of the web. Currently, I
              work at Epoxy.ai, where I collaborate with a team of experienced
              engineers to create personalization tools in the sports betting
              space. While there, I gained experience designing building
              scalable web applications with AWS. I have been enjoying getting
              my hands dirty with cloud native architecture.
            </p>
            <p>
              Previously, I worked at 21PSTEM, a non-profit specializing in
              education technology for STEM classrooms. There, I worked directly
              with educators and researches to build applications for use in
              math classes. That work tied in well with my own history as an
              educator and public school teacher.
            </p>
            <p>
              I began my journey as a self-taught web developer. To hone my
              skills, I took part in projects with chingu.io, where I was
              grouped with other web developers across the world to build
              projects together.
            </p>
            <p>
              In an earlier life, I was a public school teacher in Warren
              Township, NJ, where I taught instrumental music, and a freelance
              cellist in New York City.
            </p>
            <p>Skills: TypeScript, AWS, React, Redis, MongoDB, SQL, Ember.js</p>
            <p>
              I am also an avid rock climber, shape note singer, mycologist, and
              Seinfeld fan.
            </p>
          </article>
        </Card>
        <Card styleReference={styles.pstem} heading={"21pstem employment"}>
          <header>
            <Image src={encompassLogo} alt="logo" />
          </header>
          <article id="21pstem">
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
        </Card>
        <Card styleReference={styles.epoxy} heading={"epoxy.ai employment"}>
          <header>
            <Image src={epoxyLogo} alt="epoxy.ai logo" width={100} />
          </header>
          <article id="epoxyai">
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
        </Card>
      </main>
    </div>
  );
}

export default Page;
