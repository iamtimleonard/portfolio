import Link from "next/link";
import "./global.css";
import styles from "./home.module.css";

export const metadata = {
  title: "Tim Leonard's Personal Website",
  description: "iamtimleonard",
};

function NavItem({ href, title }) {
  return (
    <li className={styles.navListItem}>
      <Link href={href} className={styles.navLink}>
        {title}
      </Link>
    </li>
  );
}

function NavBar() {
  return (
    <div className={styles.navContainer}>
      <header className={styles.navBar}>
        <nav className={styles.nav}>
          <ol className={styles.navList}>
            <NavItem href="/" title="Home" />
            <NavItem href="/about" title="About Me" />
            <NavItem href="/things-i-use" title="Things I Use" />
          </ol>
        </nav>
      </header>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <NavBar></NavBar>
        <div className={styles.container}>
          {" "}
          <div className={styles.asymmetric}>
            <main className={styles.mainContent}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
