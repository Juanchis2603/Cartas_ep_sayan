import { useNavigate } from 'react-router-dom';
import CreaCarta from '../Componentes/CreaCarta';
import './VistaMazo.css';

export default function CrearCartaPage() {
  const navigate = useNavigate();

  return (
    <div className="detalle-page" style={{ padding: '40px 20px' }}>
      <button onClick={() => navigate('/mazo')} className="btn-edit" style={{ marginBottom: '30px' }}>
        ← Volver al Mazo
      </button>
      <div className="edit-form-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#ffcc00', marginBottom: '20px', textShadow: '0 0 10px #ff8c00' }}>INVOCAR NUEVA CARTA</h2>
        <CreaCarta />
      </div>
    </div>
  );
}
