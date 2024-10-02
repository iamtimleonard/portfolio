import Link from "next/link";
import styles from "./games.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.gamesContainer}>
      <nav className={styles.gamesList}>
        <h1>Games</h1>
        <ul>
          <li>
            <Link href="/games/minesweeper">Minesweeper</Link>
          </li>
          <li>
            <Link href="/games/synth">Synth</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.game}>{children}</div>
    </div>
  );
}
