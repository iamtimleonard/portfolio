import styles from "./blog.module.css"
import entries from "../../lib/blog.json"

const Page = () => (
  <div className={styles.blog}>
    {entries.reverse().map((entry) => (
      <article key={entry.id} className={styles.entry}>
        <p className={styles.date}>{new Date(entry.date).toLocaleDateString()}</p>
        <h3 className={styles.title}>{entry.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: entry.text}} />
      </article>
    ))}
  </div>
)

export default Page
