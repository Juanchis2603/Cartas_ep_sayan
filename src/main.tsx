import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import VistaMazo from './Screens/VistaMazo'
import CrearCartaPage from './Screens/CrearCartaPage'
import DetalleCartaPage from './Screens/DetalleCartaPage'
import Batalla from './Componentes/Batalla'
import Dragon from './Componentes/Dragon'

createRoot(document.getElementById('root')!).render( 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<VistaMazo />} />
        <Route path="/mazo" element={<VistaMazo />} />
        <Route path="/crear-carta" element={<CrearCartaPage />} />
        <Route path="/detalle/:id" element={<DetalleCartaPage />} />
        <Route path="/editar-carta/:id" element={<VistaMazo />} />
        <Route path="/batalla" element={<Batalla />} />
        <Route path="/dragon" element={<Dragon />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
