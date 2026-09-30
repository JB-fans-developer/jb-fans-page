/* ============================================
   JORY BOY FAN PAGE — SU HISTORIA
   Historia.jsx
   ============================================ */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HISTORIA_ETAPAS, FAMILIA, MEMORIA } from '../../../constants/index'
import styles from './Historia.module.css'

/* --- Variantes de animación --- */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
}

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut' } }
}

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut' } }
}

/* --- Componente de un bloque de storytelling --- */
function BloqueHistoria({ etapa, invertido }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const imagenVariant = invertido ? fadeRight : fadeLeft
  const textoVariant = invertido ? fadeLeft : fadeRight

  return (
    <div
      ref={ref}
      className={`${styles.bloque} ${invertido ? styles.bloqueInvertido : ''}`}
    >
      {/* IMAGEN */}
      <motion.div
        className={styles.bloqueImagen}
        variants={imagenVariant}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {etapa.imagen ? (
          <img src={etapa.imagen} alt={etapa.imagenAlt} className={styles.bloqueImg} />
        ) : (
          <div className={styles.bloqueImgPlaceholder}>
            <span className={styles.bloqueNumero}>{etapa.numero}</span>
          </div>
        )}
      </motion.div>

      {/* TEXTO */}
      <motion.div
        className={styles.bloqueTexto}
        variants={textoVariant}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <span className={styles.bloquePeriodo}>{etapa.periodo}</span>
        <h3 className={styles.bloqueTitulo}>{etapa.titulo}</h3>
        <div className={styles.bloqueDivider} />
        <p className={styles.bloqueDescripcion}>{etapa.descripcion}</p>
      </motion.div>
    </div>
  )
}

/* --- Componente tarjeta de familia --- */
function TarjetaFamilia({ integrante, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={styles.familiaCard}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
    >
      {/* Foto circular */}
      <div className={styles.familiaFoto}>
        {integrante.imagen ? (
          <img src={integrante.imagen} alt={integrante.nombre} className={styles.familiaImg} />
        ) : (
          <div className={styles.familiaFotoPlaceholder}>
            <span className={styles.familiaInicial}>
              {integrante.nombre.charAt(0)}
            </span>
          </div>
        )}
        <div className={styles.familiaFotoRing} />
      </div>

      {/* Info */}
      <div className={styles.familiaInfo}>
        <h4 className={styles.familiaNombre}>{integrante.nombre}</h4>
        <span className={styles.familiaRol}>{integrante.rol}</span>
        <p className={styles.familiaDescripcion}>{integrante.descripcion}</p>
      </div>
    </motion.div>
  )
}

/* --- COMPONENTE PRINCIPAL --- */
function Historia() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <section className={styles.historia} id="historia">

      {/* ══════════════════════════════════════
          1. HERO TIPOGRÁFICO — 100vh
      ══════════════════════════════════════ */}
      <div className={styles.heroSection} ref={heroRef}>

        {/* Línea decorativa izquierda */}
        <motion.div
          className={styles.heroLineaIzq}
          initial={{ scaleY: 0 }}
          animate={heroInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        />

        <div className={styles.heroContenido}>

          {/* Título Big Type — protagonista absoluto */}
          <motion.div
            className={styles.heroBigType}
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className={styles.heroBigLine1}
              initial={{ opacity: 0, y: 80 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            >
              ¡CONOCE
            </motion.span>
            <motion.span
              className={styles.heroBigLine2}
              initial={{ opacity: 0, y: 80 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
            >
              SU
            </motion.span>
            <motion.span
              className={styles.heroBigLine3}
              initial={{ opacity: 0, y: 80 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.9, ease: 'easeOut' }}
            >
              HISTORIA!
            </motion.span>
          </motion.div>

          {/* Subtítulo editorial */}
          <motion.p
            className={styles.heroSubtitulo}
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            "La música la lleva en su sistema sanguíneo"
          </motion.p>
        </div>

        {/* Número decorativo de fondo */}
        <div className={styles.heroDecorNumero}>Jory</div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>Desliza y Conoce de jory!</span>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          2. STORYTELLING — 5 BLOQUES
      ══════════════════════════════════════ */}
      <div className={styles.storytelling}>
        {HISTORIA_ETAPAS.map((etapa, i) => (
          <BloqueHistoria
            key={etapa.id}
            etapa={etapa}
            invertido={i % 2 !== 0}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════
          3. SECCIÓN FAMILIA
      ══════════════════════════════════════ */}
      <div className={styles.familiaSection}>
        <div className={styles.familiaHeader}>
          <motion.h2
            className={styles.familiaTitulo}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            SU FAMILIA
          </motion.h2>
        </div>

        <div className={styles.familiaGrid}>
          {FAMILIA.map((integrante, i) => (
            <TarjetaFamilia
              key={integrante.id}
              integrante={integrante}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          EN MEMORIA DE BEZUIR
      ══════════════════════════════════════ */}
      <motion.div
        className={styles.memoriaSection}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <h2 className={styles.memoriaTitulo}>
          <span className={styles.memoriaTituloBlanco}>En Memoria de</span>
          <span className={styles.memoriaNombreWrap}>
            <span className={styles.memoriaTituloGold}>{MEMORIA.nombre}</span>
            <span className={styles.memoriaApellido}>{MEMORIA.apellido}</span>
          </span>
        </h2>

        <p className={styles.memoriaSubtitulo}>{MEMORIA.subtitulo}</p>

        <div className={styles.memoriaImagenWrap}>
          <div className={styles.memoriaHalo} />
          {MEMORIA.imagen ? (
            <img
              src={MEMORIA.imagen}
              alt={`En memoria de ${MEMORIA.nombre}`}
              className={styles.memoriaImagen}
            />
          ) : (
            <div className={styles.memoriaImagenPlaceholder}>
              <span className={styles.memoriaInicial}>{MEMORIA.nombre.charAt(0)}</span>
            </div>
          )}
        </div>

        <p className={styles.memoriaMensaje}>{MEMORIA.mensaje}</p>
      </motion.div>

    </section>
  )
}

export default Historia