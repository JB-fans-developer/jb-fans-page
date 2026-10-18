/* ============================================
   JORY BOY FAN PAGE — TEST: VISTA DE PREGUNTAS
   components/sections/FanTest/TestPreguntas.jsx
   ============================================ */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PREGUNTAS_TEST } from '../../../constants/index'
import styles from './TestPreguntas.module.css'

const LETRAS = ['A', 'B', 'C', 'D']
const pad = (n) => String(n).padStart(2, '0')

function TestPreguntas({ onSalir, onFinalizar }) {
  const total = PREGUNTAS_TEST.length

  const [indice, setIndice] = useState(0)
  const [seleccion, setSeleccion] = useState(null)
  const [respuestas, setRespuestas] = useState([])

  if (total === 0) return null

  const actual = PREGUNTAS_TEST[indice]
  const esUltima = indice === total - 1
  const progreso = ((indice + 1) / total) * 100

  const avanzar = () => {
    if (seleccion === null) return
    const acumuladas = [...respuestas, seleccion]

    if (esUltima) {
      onFinalizar(acumuladas)
      return
    }

    setRespuestas(acumuladas)
    setIndice((i) => i + 1)
    setSeleccion(null)
  }

  return (
    <div className={styles.test}>

      {/* INDICADOR + SALIR */}
      <div className={styles.encabezado}>
        <p className={styles.indicador}>
          Pregunta <span className={styles.indicadorNum}>{pad(indice + 1)}</span>
          <span className={styles.indicadorTotal}> / {pad(total)}</span>
        </p>
        <button type="button" className={styles.salir} onClick={onSalir}>
          Salir
        </button>
      </div>

      {/* BARRA DE PROGRESO */}
      <div
        className={styles.barra}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={indice + 1}
      >
        <motion.div
          className={styles.barraRelleno}
          initial={false}
          animate={{ width: `${progreso}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* PREGUNTA + OPCIONES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <h3 className={styles.pregunta}>{actual.pregunta}</h3>

          <div
            className={styles.opciones}
            role="radiogroup"
            aria-label="Opciones de respuesta"
          >
            {actual.opciones.map((texto, i) => (
              <motion.button
                key={i}
                type="button"
                role="radio"
                aria-checked={seleccion === i}
                className={`${styles.opcion} ${seleccion === i ? styles.opcionActiva : ''}`}
                onClick={() => setSeleccion(i)}
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.35, delay: 0.1 + i * 0.06 },
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={styles.opcionLetra}>{LETRAS[i]}</span>
                <span className={styles.opcionTexto}>{texto}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* SIGUIENTE / FINALIZAR */}
      <div className={styles.acciones}>
        <button
          type="button"
          className={styles.siguiente}
          onClick={avanzar}
          disabled={seleccion === null}
        >
          {esUltima ? 'Finalizar' : 'Siguiente'}
          <span aria-hidden="true">→</span>
        </button>
      </div>

    </div>
  )
}

export default TestPreguntas