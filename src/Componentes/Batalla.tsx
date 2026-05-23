import { useLocation, useNavigate } from 'react-router-dom';
import './Batalla.css';
import { useState, useEffect } from 'react';

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

  const [lifeA, setLifeA] = useState<number>(a.lifePoints ?? 100);
  const [lifeB, setLifeB] = useState<number>(b.lifePoints ?? 100);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (lifeA <= 0) setWinner(b.name);
    else if (lifeB <= 0) setWinner(a.name);
    else setWinner(null);
  }, [lifeA, lifeB]);

  const dañoCritico = () => {
    setLifeB((prev) => Math.max(0, prev - Math.floor(prev / 2)));
  };

  const dañoNormal = () => {
    setLifeB((prev) => Math.max(0, prev - 50));
  };

  return (
    <div className="batalla-page">
      <h2>Batalla: {a.name} VS {b.name}</h2>
      <div className="batalla-grid">
        <div className="batalla-card">
          <img src={a.pictureUrl} alt={a.name} />
          <h3>{a.name}</h3>
          <p>Ataque: {a.attack}</p>
          <p>Defensa: {a.defense}</p>
          <p>Vida: <strong>{lifeA}</strong></p>
        </div>

        <div className="batalla-vs">VS</div>

        <div className="batalla-card">
          <img src={b.pictureUrl} alt={b.name} />
          <h3>{b.name}</h3>
          <p>Ataque: {b.attack}</p>
          <p>Defensa: {b.defense}</p>
          <p>Vida: <strong>{lifeB}</strong></p>
        </div>
      </div>

      <div className="batalla-actions" style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button className="btn-critico" onClick={dañoCritico}>Daño Crítico</button>
        <button className="btn-normal" onClick={dañoNormal}>Daño Normal</button>
      </div>

      {winner && <div style={{ marginTop: 18, fontWeight: 800, color: '#0026ff' }}>Ganador: {winner}</div>}

      <div style={{ marginTop: 20 }}>
        <button className="btn-volver" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
}
