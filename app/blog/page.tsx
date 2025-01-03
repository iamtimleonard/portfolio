import styles from "./blog.module.css"
import entries from "../../lib/blog.json"

const Page = () => (
  <div className={styles.blog}>
    {entries.map((entry) => (
      <article className={styles.entry}>
        <p className={styles.date}>{new Date(entry.date).toLocaleDateString()}</p>
        <h3 className={styles.title}>{entry.title}</h3>
        <p className={styles.text}>{entry.text}</p>
      </article>
    ))}
  </div>
)

export default Page
