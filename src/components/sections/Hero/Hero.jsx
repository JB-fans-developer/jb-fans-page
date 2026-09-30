/* ============================================
   JORY BOY FAN PAGE — HERO SECTION
   Hero.jsx
   ============================================ */

import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import fondoDesktop from '../../../assets/images/hero/fondo_hero.png'
import fondoMobile from '../../../assets/images/hero/hero_mobile_v3.png'
import { useNavigate } from 'react-router-dom'

/* --- Variantes de animación fade in --- */
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeOut' }
  }
}

const fadeInDelay = (delay) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut', delay }
  }
})

function Hero() {
  const navigate = useNavigate()

  return (

    <motion.section
      className={styles.hero}
      style={{
        '--bg-desktop': `url(${fondoDesktop})`,
        '--bg-mobile': `url(${fondoMobile})`,
      }}
      
    >
      <div className={styles.overlay} />

      <div className={styles.content}>

        <motion.h1
          className={styles.title}
          variants={fadeInDelay(0.7)}
          initial="hidden"
          animate="visible"
        >
          <span className={styles.titleLine1}>UN SITIO PARA</span>
          <span className={styles.titleLine2}>VERDADEROS</span>
          <span className={styles.titleLine3}>Fanáticos</span>
        </motion.h1>

        <motion.div
          variants={fadeInDelay(1.1)}
          initial="hidden"
          animate="visible"
        >
          <button className={styles.cta} onClick={() => navigate('/historia')}>
            <span className={styles.ctaText}>Conoce su historia</span>
            <span className={styles.ctaArrow}>→</span>
          </button>
        </motion.div>

      </div>
    </motion.section>

  )
}

export default Hero