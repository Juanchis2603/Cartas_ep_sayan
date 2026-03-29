import { Outlet, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Mis Cartas de Perros Super Saiyajin</h1>
      <nav style={{ textAlign: 'center', marginBottom: '30px', position: 'relative', zIndex: 10 }}>
        <Link to="/mazo" className="btn-edit" style={{ textDecoration: 'none', margin: '0 10px' }}>Ver Mazo</Link>
        <Link to="/crear-carta" className="btn-delete" style={{ textDecoration: 'none', margin: '0 10px' }}>Invocación (Crear)</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
