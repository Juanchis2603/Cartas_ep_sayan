import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'

createRoot(document.getElementById('root')!).render( 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}></Route>
      <Route path="/mazo" element={<App/>}></Route>
      <Route path="/crear-carta" element={<App/>}></Route>
      <Route path="/detalle/:id" element={<App/>}></Route>
      <Route path="/editar-carta/:id" element={<App/>}></Route>
    </Routes>
  </BrowserRouter>
)




