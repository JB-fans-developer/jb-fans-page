/* ============================================
   JORY BOY FAN PAGE — PÁGINA GALERÍA
   Galeria.page.jsx
   ============================================ */

import Navbar  from '../../components/layout/Navbar/Navbar'
import Footer  from '../../components/layout/Footer/Footer'
import Noticias from '../../components/sections/noticias/noticias'

function NoticiasPage() {
  return (
    <main>
      <Navbar />
      <Noticias />
      <Footer />
    </main>
  )
}

export default NoticiasPage