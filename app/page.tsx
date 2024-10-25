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

function Card({ styleReference, children }) {
  return (
    <div className={styles.experiment}>
      <div className={styles.cardContainer}>
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
      <main className={styles.mainContainer}>
        <Card styleReference={styles.nameCard}>
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
        <Card styleReference={styles.bioCard}>
          <article id="about-me">
            <p>
              I began making websites for fun with friends in elementary school,
              when table-based layouts were all the rage. Somewhere in the
              depths of the internet there is an archive of the geocities site I
              made to review video games. Currently, I am a full stack engineer
              at Epoxy.ai, where I collaborate with a team of experienced
              engineers to create personalization tools in the sports betting
              space. While there, I gained experience designing and building
              scalable web applications with AWS. I have been enjoying getting
              my hands dirty with cloud native architecture. Previously, I
              worked at 21PSTEM, a non-profit specializing in education
              technology for STEM classrooms. There, I worked directly with
              educators and researches to build applications for use in math
              classes. That work tied in well with my own history as an educator
              and public school teacher.
            </p>
            <p>
              I began my journey as a self-taught web developer. To hone my
              skills, I took part in projects with chingu.io, where I was
              grouped with other web developers across the world to build
              projects together. I got to work on some interesting projects with
              equally interesting people - a standout was a mushroom locator
              app. It taught me a lot about software design and working as a
              team of developers.
            </p>
            <p>
              In an earlier life, I was a professional cellist, freelancing in
              New York City, and a public school music teacher in Warren
              Township, NJ, where I taught instrumental music.
            </p>
            <p>
              I am also an avid rock climber, shape note singer, mycologist, and
              Seinfeld fan.
            </p>
            <figure>
              <figcaption>Things I use: </figcaption>
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
            </figure>
          </article>
        </Card>
      </main>
    </div>
  );
}

export default Page;
