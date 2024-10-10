import styles from './quiz-game.module.css'

export default function Page() {
  return (
    <div className={ styles.container }>
      <iframe title="Quiz App" src="https://quiz-app-iamtimleonard.vercel.app/"></iframe>
    </div>
  )
}