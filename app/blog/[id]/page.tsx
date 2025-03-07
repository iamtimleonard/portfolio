import styles from "../blog.module.css"
import entries from "../../../lib/blog.json"
import { redirect } from "next/navigation"

const Page = ({ params }) => {
  const id = params.id
  const entry = entries.find((entry) => id === entry.id.toString())

  if (!entry) return redirect('/blog')
  return (
    <div className={styles.blog}>
      <article className={styles.entry}>
        <p className={styles.date}>{new Date(entry.date).toLocaleDateString()}</p>
        <h3 className={styles.title}>{entry.title}</h3>
        <div className={styles.post} dangerouslySetInnerHTML={{__html: entry.text}} /> 
      </article>
    </div>
  )
}

export default Page
