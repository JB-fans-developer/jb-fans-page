/* ============================================
   JORY BOY FAN PAGE — TEST: RESULTADO
   components/sections/FanTest/TestResultado.jsx
   ============================================ */

import { useState, useEffect } from 'react'
import { motion, animate } from 'framer-motion'
import { PREGUNTAS_TEST, NIVELES_TEST } from '../../../constants/index'
import styles from './TestResultado.module.css'

const DURACION_ANILLO = 1.2

function TestResultado({ respuestas, onRepetir, onSalir }) {
  const total = PREGUNTAS_TEST.length
  const aciertos = respuestas.filter(
    (r, i) => r === PREGUNTAS_TEST[i]?.correcta
  ).length

  /* El 100% solo aparece si acertó TODAS: el redondeo nunca regala un 100 */
  const porcentaje =
    total === 0
      ? 0
      : aciertos === total
        ? 100
        : Math.min(99, Math.round((aciertos / total) * 100))

  const nivel =
    NIVELES_TEST.find((n) => porcentaje >= n.min) ||
    NIVELES_TEST[NIVELES_TEST.length - 1]

  /* Número que sube de 0 hasta el porcentaje, a la par del anillo */
  const [valor, setValor] = useState(0)

  useEffect(() => {
    const controles = animate(0, porcentaje, {
      duration: DURACION_ANILLO,
      ease: 'easeOut',
      onUpdate: (v) => setValor(Math.round(v)),
    })
    return () => controles.stop()
  }, [porcentaje])

  return (
    <div className={styles.resultado}>

      <motion.p
        className={styles.etiqueta}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Tu resultado
      </motion.p>

      {/* ANILLO + PORCENTAJE */}
      <div className={styles.anilloWrap}>
        <svg className={styles.anillo} viewBox="0 0 200 200" aria-hidden="true">
          <circle className={styles.anilloPista} cx="100" cy="100" r="90" />
          {porcentaje > 0 && (
            <motion.circle
              className={styles.anilloProgreso}
              cx="100"
              cy="100"
              r="90"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: porcentaje / 100 }}
              transition={{ duration: DURACION_ANILLO, ease: 'easeOut' }}
            />
          )}
        </svg>

        <div
          className={styles.anilloNumero}
          role="img"
          aria-label={`${porcentaje} por ciento de aciertos`}
        >
          {valor}
          <span className={styles.simbolo}>%</span>
        </div>
      </div>

      {/* NIVEL + FRASE */}
      <motion.h3
        className={styles.nivel}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {nivel.titulo}
      </motion.h3>

      <motion.p
        className={styles.frase}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        {nivel.frase}
      </motion.p>

      <motion.p
        className={styles.detalle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        Acertaste {aciertos} de {total} preguntas
      </motion.p>

      {/* ACCIONES */}
      <motion.div
        className={styles.acciones}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <button type="button" className={styles.repetir} onClick={onRepetir}>
          Repetir test
        </button>
        <button type="button" className={styles.volver} onClick={onSalir}>
          Volver al inicio
        </button>
      </motion.div>

    </div>
  )
}

export default TestResultado