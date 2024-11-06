"use client";

import { IconContext } from "react-icons";
import { AiOutlineConsoleSql } from "react-icons/ai";
import {
  FaAws,
  FaCss3,
  FaEmber,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { SiMongodb, SiRedis, SiTypescript } from "react-icons/si";
import styles from "./things.module.css";

const thingsList = [
  {
    name: "node.js",
    icon: FaNodeJs,
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
  },
  {
    name: "AWS",
    icon: FaAws,
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
  },
  {
    name: "SQL",
    icon: AiOutlineConsoleSql,
  },
  {
    name: "Redis",
    icon: SiRedis,
  },
  {
    name: "HTML5",
    icon: FaHtml5,
  },
  {
    name: "CSS3",
    icon: FaCss3,
  },
  {
    name: "React",
    icon: FaReact,
  },
  {
    name: "Ember.js",
    icon: FaEmber,
  },
];

function Page() {
  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <ol className={styles.carousel}>
        {thingsList.map(({ name, icon }) => (
          <li className={styles.listItem}>{icon({ title: name })}</li>
        ))}
      </ol>
    </IconContext.Provider>
  );
}

export default Page;
