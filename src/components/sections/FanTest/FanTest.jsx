/* ============================================
   JORY BOY FAN PAGE — FAN TEST
   components/sections/FanTest/FanTest.jsx
   ============================================ */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TestPreguntas from './TestPreguntas'
import TestResultado from './TestResultado'
import styles from './FanTest.module.css'

function FanTest() {
  const [vista, setVista] = useState('portada') // 'portada' | 'test' | 'resultado'
  const [respuestas, setRespuestas] = useState([])

  const finalizar = (resp) => {
    setRespuestas(resp)
    setVista('resultado')
  }

  return (
    <section className={styles.fanTest} id="fan-test">
      <AnimatePresence mode="wait">

        {/* ── PORTADA ── */}
        {vista === 'portada' && (
          <motion.div
            key="portada"
            className={styles.hero}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.heroGlow} />

            <div className={styles.heroContenido}>
              <motion.h2
                className={styles.heroTitulo}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              >
                <span className={styles.heroLinea1}>PON A PRUEBA</span>
                <span className={styles.heroLinea2}>CUÁNTO CONOCES DE</span>
                <span className={styles.heroLinea3}> Jory</span>
              </motion.h2>

              <motion.button
                type="button"
                className={styles.comenzarBtn}
                onClick={() => setVista('test')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                whileTap={{ scale: 0.97 }}
              >
                Comenzar Test
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── VISTA DE PREGUNTAS ── */}
        {vista === 'test' && (
          <motion.div
            key="test"
            className={styles.hero}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.heroGlow} />

            <div className={styles.heroContenido}>
              <TestPreguntas
                onSalir={() => setVista('portada')}
                onFinalizar={finalizar}
              />
            </div>
          </motion.div>
        )}

        {/* ── RESULTADO ── */}
        {vista === 'resultado' && (
          <motion.div
            key="resultado"
            className={styles.hero}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.heroGlow} />

            <div className={styles.heroContenido}>
              <TestResultado
                respuestas={respuestas}
                onRepetir={() => setVista('test')}
                onSalir={() => setVista('portada')}
              />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  )
}

export default FanTest