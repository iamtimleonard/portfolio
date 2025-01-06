import Link from "next/link";
import "./global.css";
import styles from "./home.module.css";
import { MdRssFeed } from 'react-icons/md';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tim Leonard's Personal Website",
  description: "iamtimleonard",
  alternates: {
    types: {
      "application/atom+xml": [
        {
          url: "feed.atom",
          title: "Tim Leonard's Blog"
        }
      ]
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        {/* <NavBar /> */}
        <div className={styles.container}>
          <div className={styles.asymmetric}>
            <main className={styles.mainContent}>{children}</main>
          </div>
        </div>
        <footer className={styles.footer}>
          <p className={styles.copyright}>Copyright {new Date().getFullYear()}</p>
          <span className={styles.rssIcon}><Link href="/feed.atom"><MdRssFeed color="#ee802f" size="30px" /></Link></span>
        </footer>
      </body>
    </html>
  );
}
