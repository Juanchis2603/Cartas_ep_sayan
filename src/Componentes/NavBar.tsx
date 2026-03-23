import { Link } from 'react-router';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/:id">Inicio</Link></li>
        <li><Link to="/:id">Mi Mazo</Link></li>
        <li><Link to="/:id">Crear Carta</Link></li>
      </ul>
    </nav>
  );
}