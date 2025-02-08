import styles from "./blog.module.css"
import entries from "../../lib/blog.json"
import Link from "next/link"

const Page = () => (
  <div className={styles.blog}>
    {entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry) => (
      <article key={entry.id} className={styles.entry}>
        <p className={styles.date}>{new Date(entry.date).toLocaleDateString()}</p>
        <Link href={`/blog/${entry.id}`}><h3 className={styles.title}>{entry.title}</h3></Link>
        <div className={styles.post} dangerouslySetInnerHTML={{ __html: entry.text}} />
      </article>
    ))}
  </div>
)

export default Page
