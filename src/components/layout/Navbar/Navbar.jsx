/* ============================================
   JORY BOY FAN PAGE — NAVBAR
   Navbar.jsx
   ============================================ */

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo/logo.png'


const NAV_LINKS = [
  { label: 'Inicio', href: '/', interno: true },
  { label: 'Su Historia', href: '/historia', interno: true },
  { label: 'Galería', href: '/galeria', interno: true },
  { label: 'Noticias', href: '/noticias', interno: true },
  { label: 'Shows', href: '/shows', interno: true },
  { label: 'Frases', href: '/frases', interno: true },
]

function Navbar() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  /* --- Lógica hide on scroll down / show on scroll up --- */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      // Mostrar/ocultar según dirección del scroll
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false)   // scrolleando hacia abajo → ocultar
        setMenuOpen(false)  // cerrar menú móvil si estaba abierto
      } else {
        setVisible(true)    // scrolleando hacia arriba → mostrar
      }

      // Activar fondo glass cuando no estamos en el top
      setScrolled(currentY > 20)

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* --- Bloquear scroll del body cuando menú móvil está abierto --- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── NAVBAR PRINCIPAL ── */}
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        animate={{ y: visible ? 0 : '-100%' }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <div className={styles.inner}>

          {/* LOGO */}
          <a href="#inicio" className={styles.logo} aria-label="Jory Boy Fan Page">
            {/* Reemplaza con tu imagen: <img src={logo} alt="Logo" /> */}
            <img src={logo} alt="Jory Boy" className={styles.logoImg} />
            {/* <span className={styles.logoText}>JORY CLUB</span>  */}
          </a>

          {/* LINKS — Desktop */}
          <ul className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.interno ? (
                  <Link to={link.href} className={styles.link}>
                    {link.label}
                    <span className={styles.linkUnderline} />
                  </Link>
                ) : (
                  <a href={link.href} className={styles.link}>
                    {link.label}
                    <span className={styles.linkUnderline} />
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* BOTÓN HAMBURGUESA — Móvil */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>

        </div>
      </motion.nav>

      {/* ── MENÚ MÓVIL DESLIZABLE ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay oscuro */}
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel — entra deslizando desde fuera de la pantalla (derecha) */}
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <ul className={styles.mobileLinks}>
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {link.interno ? (
                      <Link
                        to={link.href}
                        className={styles.mobileLink}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={styles.mobileLink}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence >
    </>
  )
}

export default Navbar