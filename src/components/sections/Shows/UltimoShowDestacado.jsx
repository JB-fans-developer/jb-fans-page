/* ============================================
   JORY BOY FAN PAGE — ÚLTIMO SHOW DESTACADO
   components/sections/Shows/UltimoShowDestacado.jsx

   Sin avance automático: la pila solo cambia
   cuando se presiona un botón.
   ============================================ */

import { useState, useRef, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { SHOW_DESTACADO } from '../../../constants/index'
import StackCard from './StackCard'
import styles from './Shows.module.css'

const DURACION_TRANSICION = 500 // ms, igual a la duración de la animación

function rotar(orden) {
  const [primero, ...resto] = orden
  return [...resto, primero]
}

function UltimoShowDestacado() {
  const { nombre, ciudad, pais, texto, creditos, medios } = SHOW_DESTACADO

  /* Un solo estado: reordenar la pila y terminar la salida ocurren
     en la MISMA actualización, así la tarjeta nueva del frente nunca
     hereda "saliendo" y no se encadenan avances. */
  const [estado, setEstado] = useState({
    orden: medios.map((_, i) => i),
    saliendo: false,
  })
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const avanzar = () => {
    if (estado.saliendo || medios.length < 2) return
    setEstado((e) => ({ ...e, saliendo: true }))
    timeoutRef.current = setTimeout(() => {
      setEstado((e) => ({ orden: rotar(e.orden), saliendo: false }))
    }, DURACION_TRANSICION)
  }

  const retroceder = () => {
    if (estado.saliendo || medios.length < 2) return
    setEstado((e) => {
      const ultimo = e.orden[e.orden.length - 1]
      return { ...e, orden: [ultimo, ...e.orden.slice(0, -1)] }
    })
  }

  if (!medios || medios.length === 0) return null

  return (
    <section className={styles.destacadoSection}>
      <h3 className={styles.showsTitulo}>Último Show Destacado</h3>

      <div className={styles.destacadoContenido}>

        <div className={styles.stackColumna}>
          <div className={styles.stackWrap}>
            {estado.orden.slice(0, 3).map((medioIndex, posicion) => {
              const esFrente = posicion === 0
              return (
                <StackCard
                  key={medioIndex}
                  medio={medios[medioIndex]}
                  posicion={posicion}
                  esFrente={esFrente}
                  animarSalida={esFrente && estado.saliendo}
                  lado={1}
                  alt={nombre}
                  zIndex={10 - posicion}
                />
              )
            })}
          </div>

          {medios.length > 1 && (
            <div className={styles.destacadoNav}>
              <button
                type="button"
                className={styles.destacadoNavBtn}
                onClick={retroceder}
                aria-label="Medio anterior"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                className={styles.destacadoNavBtn}
                onClick={avanzar}
                aria-label="Siguiente medio"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        <div className={styles.destacadoInfo}>
          <h4 className={styles.destacadoNombre}>{nombre}</h4>
          <span className={styles.destacadoLugar}>{ciudad}, {pais}</span>
          <p className={styles.destacadoTexto}>{texto}</p>
        </div>
      </div>

      {creditos && (
        <span className={styles.destacadoCreditos}>Contenido cortesía de {creditos}</span>
      )}
    </section>
  )
}

export default UltimoShowDestacado