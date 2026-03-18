import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import VistaMazo from './Screens/VistaMazo'
import CrearCartaPage from './Screens/CrearCartaPage'
import DetalleCartaPage from './Screens/DetalleCartaPage'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<VistaMazo />} />
        <Route path="crear" element={<CrearCartaPage />} />
        <Route path="card/:id" element={<DetalleCartaPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)