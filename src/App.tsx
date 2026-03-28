import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Mis Cartas de Perros Super Saiyajin</h1>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
