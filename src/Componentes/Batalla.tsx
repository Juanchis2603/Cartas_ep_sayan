import { useLocation, useNavigate } from 'react-router-dom';
import './Batalla.css';

type CardShape = {
  idCard: number;
  name: string;
  tipo?: string;
  attack?: number;
  defense?: number;
  lifePoints?: number;
  description?: string;
  pictureUrl?: string;
};

export default function Batalla() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cards: CardShape[] = state?.cards ?? [];

  if (cards.length !== 2) {
    return (
      <div className="batalla-page">
        <h2>Batalla</h2>
        <p>No hay dos cartas seleccionadas.</p>
        <button onClick={() => navigate(-1)} className="btn-volver">Volver</button>
      </div>
    );
  }

  const [a, b] = cards;

  return (
    <div className="batalla-page">
      <h2>Batalla: {a.name} VS {b.name}</h2>
      <div className="batalla-grid">
        <div className="batalla-card">
          <img src={a.pictureUrl} alt={a.name} />
          <h3>{a.name}</h3>
          <p>Ataque: {a.attack}</p>
          <p>Defensa: {a.defense}</p>
        </div>

        <div className="batalla-vs">VS</div>

        <div className="batalla-card">
          <img src={b.pictureUrl} alt={b.name} />
          <h3>{b.name}</h3>
          <p>Ataque: {b.attack}</p>
          <p>Defensa: {b.defense}</p>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <button className="btn-volver" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
}
