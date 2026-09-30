/* ============================================
   JORY BOY FAN PAGE — FRASES
   components/sections/Frases/Frases.jsx
   (vacío por ahora — lo llenamos con tus
   próximas instrucciones)
   ============================================ */

import styles from './Frases.module.css'

function Frases() {
  return (
    <section className={styles.frases} id="frases">
      <div className={styles.header}>
        <span className={styles.label}>Próximamente</span>
        <h2 className={styles.titulo}>
          <span className={styles.tituloBlanco}>TU</span>
          <span className={styles.tituloGold}>FRASE</span>
        </h2>
      </div>
    </section>
  )
}

export default Frases