import styles from './loginPanel.module.css'

export default function LoginPanel({ children }: { children?: React.ReactNode }) {
  return (
  <section className={styles.shadow}>
    <div className={styles.panel}>
      {children}
    </div>
  </section>
  )
}