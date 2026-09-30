/* ============================================
   JORY BOY FAN PAGE — SHOWS
   components/sections/Shows/Shows.jsx
   ============================================ */

import { PROXIMOS_SHOWS } from '../../../constants/index'
import styles from './Shows.module.css'

const MESES_CORTOS = [
  'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC',
]

function formatearFechaCorta(fechaISO) {
  if (!fechaISO) return { dia: '--', mes: '---' }
  const [, mes, dia] = fechaISO.split('-')
  return { dia, mes: MESES_CORTOS[parseInt(mes, 10) - 1] || '---' }
}

/* ── "Próximos Shows" — timeline horizontal (vertical en móvil) ──
   Máximo 3 nodos. Si hay menos shows reales, se completa
   con placeholders "POR CONFIRMAR". */
function Shows() {
  const shows = [...PROXIMOS_SHOWS]
    .filter((s) => s.fecha)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .slice(0, 3)

  const items = [...shows]
  while (items.length < 3) {
    items.push({ id: `placeholder-${items.length}`, placeholder: true })
  }

  return (
    <section className={styles.showsSection} id="shows">
      <h3 className={styles.showsTitulo}>Próximos Shows</h3>

      <div className={styles.timeline}>
        {items.map((show, i) => {
          const { dia, mes } = show.placeholder ? {} : formatearFechaCorta(show.fecha)
          const esUltimo = i === items.length - 1

          const Nodo = (
            <div className={styles.nodoColumna}>
              <span
                className={styles.showFechaTop}
                style={show.placeholder ? { visibility: 'hidden' } : undefined}
              >
                {show.placeholder ? '-- ---' : `${dia} ${mes}`}
              </span>

              <div className={styles.timelineNodo}>
                {show.placeholder ? (
                  <div className={styles.nodoPlaceholder}>?</div>
                ) : (
                  <>
                    <div className={styles.nodoHalo} />
                    <img
                      src={show.flyer}
                      alt={`Flyer — ${show.ciudad}`}
                      className={styles.nodoFlyer}
                    />
                  </>
                )}
              </div>
            </div>
          )

          return (
            <div key={show.id} className={styles.timelineItem}>
              {!show.placeholder && show.urlBoletos ? (
                <a
                  href={show.urlBoletos}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Boletos — ${show.ciudad}`}
                >
                  {Nodo}
                </a>
              ) : (
                Nodo
              )}

              <div className={styles.timelineInfo}>
                {show.placeholder ? (
                  <span className={styles.porConfirmar}>Por Confirmar</span>
                ) : (
                  <>
                    <span className={styles.showCiudad}>{show.ciudad}</span>
                    <span className={styles.showLugar}>{show.lugar}</span>
                  </>
                )}
              </div>

              {!esUltimo && <div className={styles.timelineLinea} />}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Shows