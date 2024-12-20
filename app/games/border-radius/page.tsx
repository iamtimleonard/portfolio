import styles from './border-radius.module.css'

export default function Page() {
  return (
    <div className={ styles.container }>
      <iframe title="Border Radius Previewer" src="https://border-radius.iamtimleonard.vercel.app/"></iframe>
    </div>
  )
}