"use client";

import { useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

function NavItem({ href, title, active, setActive }) {
  return (
    <li className={styles.navListItem}>
      <Link
        href={href}
        className={`${styles.navLink} ${active === href && styles.active}`}
        onClick={() => setActive(href)}
      >
        {title}
      </Link>
    </li>
  );
}

function NavBar() {
  const [active, setActive] = useState("/");
  return (
    <div className={styles.navContainer}>
      <header className={styles.navBar}>
        <nav className={styles.nav}>
          <ol className={styles.navList}>
            <NavItem
              href="/"
              title="Home"
              active={active}
              setActive={setActive}
            />
            <NavItem
              href="/about"
              title="About Me"
              active={active}
              setActive={setActive}
            />
            <NavItem
              href="/things-i-use"
              title="Things I Use"
              active={active}
              setActive={setActive}
            />
          </ol>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
