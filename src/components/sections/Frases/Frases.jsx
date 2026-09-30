/* ============================================
   JORY BOY FAN PAGE — FRASES
   components/sections/Frases/Frases.jsx
   ============================================ */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FRASES_CATEGORIAS, FRASES } from '../../../constants/index'
import styles from './Frases.module.css'

const DURACION_CARGA = 2000

/* ── Pantalla de carga ── */
function CargandoContenido({ categoria }) {
  return (
    <motion.div
      className={styles.cargando}
      style={{ '--cat-color': categoria.color, '--cat-glow': categoria.colorGlow }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <span className={styles.cargandoEmoji}>{categoria.emoji}</span>
      <div className={styles.cargandoAnillo} />
      <p className={styles.cargandoTexto}>
        Cargando frase de {categoria.nombre.toUpperCase()}...
      </p>
    </motion.div>
  )
}

/* ── Placeholder temporal — se reemplaza por la tarjeta real
   en el siguiente paso ── */
function ResultadoPlaceholder({ frase, categoria, onClose }) {
  const [mostrarAviso, setMostrarAviso] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setMostrarAviso(false), 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className={styles.resultadoPlaceholder}
      style={{ '--cat-color': categoria.color, '--cat-tinte': categoria.colorTinte }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <button type="button" onClick={onClose} className={styles.placeholderCerrar}>✕</button>
      <span>{categoria.emoji} {categoria.nombre}</span>
      <p>"{frase.texto}"</p>
      <small>{frase.cancion}</small>

      <AnimatePresence>
        {mostrarAviso && (
          <motion.span
            className={styles.resultadoAviso}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Haz screenshot y comparte en tus historias
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Una puerta ── */
function Puerta({ categoria, onClick, deshabilitada }) {
  return (
    <motion.button
      type="button"
      className={styles.puerta}
      style={{
        '--cat-color': categoria.color,
        '--cat-glow': categoria.colorGlow,
        '--cat-tinte': categoria.colorTinte,
      }}
      onClick={onClick}
      disabled={deshabilitada}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <span className={styles.puertaEmoji}>{categoria.emoji}</span>
      <span className={styles.puertaNombre}>{categoria.nombre}</span>
    </motion.button>
  )
}

function Frases() {
  const [estado, setEstado] = useState('inicial') // 'inicial' | 'cargando' | 'modal'
  const [categoriaActiva, setCategoriaActiva] = useState(null)
  const [frase, setFrase] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const elegirPuerta = (categoria) => {
    if (estado !== 'inicial') return

    const opciones = FRASES.filter((f) => f.categoria === categoria.id)
    if (opciones.length === 0) return

    const elegida = opciones[Math.floor(Math.random() * opciones.length)]
    setCategoriaActiva(categoria)
    setFrase(elegida)
    setEstado('cargando')

    timeoutRef.current = setTimeout(() => setEstado('modal'), DURACION_CARGA)
  }

  const cerrar = () => {
    clearTimeout(timeoutRef.current)
    setEstado('inicial')
    setCategoriaActiva(null)
    setFrase(null)
  }

  useEffect(() => {
    if (estado === 'inicial') return
    const handleKey = (e) => { if (e.key === 'Escape') cerrar() }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [estado])

  return (
    <section className={styles.frases} id="frases">

      <div className={styles.header}>
        <span className={styles.label}>Elige tu camino</span>
        <h2 className={styles.titulo}>
          <span className={styles.tituloBlanco}>TU</span>
          <span className={styles.tituloGold}>FRASE</span>
        </h2>
        <p className={styles.subtitulo}>
          Toca una puerta y deja que el azar elija la frase que te representa hoy.
        </p>
      </div>

      <div className={styles.puertasGrid}>
        {FRASES_CATEGORIAS.map((categoria) => (
          <Puerta
            key={categoria.id}
            categoria={categoria}
            onClick={() => elegirPuerta(categoria)}
            deshabilitada={estado !== 'inicial'}
          />
        ))}
      </div>

      <AnimatePresence>
        {estado !== 'inicial' && (
          <motion.div
            key="overlay"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => { if (e.target === e.currentTarget) cerrar() }}
          >
            <AnimatePresence mode="wait">
              {estado === 'cargando' ? (
                <CargandoContenido key="cargando" categoria={categoriaActiva} />
              ) : (
                <ResultadoPlaceholder
                  key="resultado"
                  frase={frase}
                  categoria={categoriaActiva}
                  onClose={cerrar}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default Frases