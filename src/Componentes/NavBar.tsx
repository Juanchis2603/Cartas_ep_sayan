import { Link } from 'react-router';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Mi Mazo</Link></li>
        <li><Link to="/crear">Crear Carta</Link></li>
      </ul>
    </nav>
  );
}