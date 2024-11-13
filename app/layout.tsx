import "./global.css";
import styles from "./home.module.css";
import NavBar from "./NavBar";

export const metadata = {
  title: "Tim Leonard's Personal Website",
  description: "iamtimleonard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <NavBar />
        <div className={styles.container}>
          <div className={styles.asymmetric}>
            <main className={styles.mainContent}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
