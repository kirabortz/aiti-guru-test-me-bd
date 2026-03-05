import Image from 'next/image'
import styles from './logo.module.css'

export default function Logo({ className }: { className: string }) {
  return (
    <div className={`${styles.logoBadge} ${className}`}>
      <div className={styles.logoBadgeBg}>
        <Image 
          src="/logo.svg"
          alt="Logo"
          width={35}
          height={34}
          priority
        />
      </div>
    </div>
  )
}