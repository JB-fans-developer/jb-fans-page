/* ============================================
   JORY BOY FAN PAGE — FRASES
   components/sections/Frases/Frases.jsx
   ============================================ */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiSpotify, SiYoutube, SiApplemusic } from 'react-icons/si'
import { FRASES_CATEGORIAS, FRASES } from '../../../constants/index'
import fotoJoryFondo from '../../../assets/images/frases/jory-frases-bg.png'
import styles from './Frases.module.css'

const DURACION_CARGA = 3000

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
      <div className={styles.cargandoAnillo} />
      <p className={styles.cargandoTexto}>
        Cargando frase de {categoria.nombre.toUpperCase()}...
      </p>
      <p className={styles.cargandoAviso}>
        Haz screenshot y comparte en tus historias
      </p>
    </motion.div>
  )
}

/* ── Placeholder temporal — se reemplaza por la tarjeta real
   en el siguiente paso ── */
function ResultadoPlaceholder({ frase, categoria, onClose }) {
  return (
    <motion.div
      className={styles.resultadoPlaceholder}
      style={{
        '--cat-color': categoria.color,
        '--cat-glow': categoria.colorGlow,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Fondo: luz de la categoría + vinilo girando + comilla + grano */}
      <div className={styles.resultadoFondoCapa} aria-hidden="true">
        <span className={styles.resultadoLuz} />
        <span className={styles.resultadoVinilo} />
        <span className={styles.resultadoComilla}>&ldquo;</span>
        <span className={styles.resultadoGrano} />
      </div>

      <button
        type="button"
        onClick={onClose}
        className={styles.placeholderCerrar}
        aria-label="Cerrar frase"
      >
        ✕
      </button>

      <div className={styles.resultadoContenido}>
        <span className={styles.resultadoArtista}>Jory Boy</span>
        <p className={styles.resultadoFrase}>{frase.texto}</p>
        <small>{frase.cancion}</small>

        {frase.streaming && (
          <div className={styles.resultadoStreaming}>
            {frase.streaming.spotify && (
              <a
                href={frase.streaming.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resultadoIcono}
                aria-label="Escuchar en Spotify"
              >
                <SiSpotify />
              </a>
            )}
            {frase.streaming.youtube && (
              <a
                href={frase.streaming.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resultadoIcono}
                aria-label="Ver en YouTube"
              >
                <SiYoutube />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Una puerta ── */
function Puerta({ categoria, onClick, deshabilitada }) {
  return (
    <motion.button
      type="button"
      className={styles.puerta}
      onClick={onClick}
      disabled={deshabilitada}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25 }}
    >
      {categoria.imagen ? (
        <img src={categoria.imagen} alt={categoria.nombre} className={styles.puertaImagen} />
      ) : (
        <span className={styles.puertaEmoji}>{categoria.emoji}</span>
      )}

      <div className={styles.puertaOverlay} />
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
        <h2 className={styles.titulo}>
          <span className={styles.tituloBlanco}>JORY</span>
          <span className={styles.tituloGold}>FRASES</span>
        </h2>
        <p className={styles.subtitulo}>
          Deja que el azar elija la frase que te representa hoy.
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