/* ============================================
   JORY BOY FAN PAGE — APP CON RUTAS
   App.jsx
   ============================================ */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home         from './pages/Home/Home'
import HistoriaPage from './pages/Historia/Historia.page'
import GaleriaPage from './pages/Galeria/Galeria.page'
import NoticiasPage from './pages/Noticias/Noticias.page'
import FloatingWhatsApp from './components/layout/FloatingWhatsApp/FloatingWhatsApp'
import ShowsPage from './pages/Shows/Shows.page'
import ScrollToTop from './components/ScrollToTop'
import FrasesPage from './pages/Frases/Frases.page'

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/historia" element={<HistoriaPage />} />
        <Route path="/galeria" element={<GaleriaPage />} />
        <Route path="/noticias" element={<NoticiasPage />} />
        <Route path="/shows" element={<ShowsPage />} />
        <Route path="/frases" element={<FrasesPage />} />
      </Routes>
      <FloatingWhatsApp />
    </BrowserRouter>
  )
}

export default App