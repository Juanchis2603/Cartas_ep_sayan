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
  const [turn, setTurn] = useState<number>(0); // 0 = A's turn, 1 = B's turn

  useEffect(() => {
    if (lifeA <= 0) setWinner(b.name);
    else if (lifeB <= 0) setWinner(a.name);
    else setWinner(null);
  }, [lifeA, lifeB]);

  const dañoCritico = () => {
    if (winner) return;
    if (turn === 0) {
      const damage = (a.attack ?? 50) * 2;
      setLifeB((prev) => Math.max(0, prev - damage));
      setTurn(1);
    } else {
      const damage = (b.attack ?? 50) * 2;
      setLifeA((prev) => Math.max(0, prev - damage));
      setTurn(0);
    }
  };

  const dañoNormal = () => {
    if (winner) return;
    if (turn === 0) {
      const damage = (a.attack ?? 50);
      setLifeB((prev) => Math.max(0, prev - damage));
      setTurn(1);
    } else {
      const damage = (b.attack ?? 50);
      setLifeA((prev) => Math.max(0, prev - damage));
      setTurn(0);
    }
  };

  return (
    <div className="batalla-page">
      <h2> {a.name} VS {b.name}</h2>
      <div className="turn-indicator">Turno: <strong>{turn === 0 ? a.name : b.name}</strong>
        <br />
        <br />
        <center>
          <img src="https://i.pinimg.com/736x/e5/52/34/e5523410c9e108b7d5f063bb0403635a.jpg" width={100} height={100} alt="" className='logo' />
        </center>
      </div>

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
        <button className="btn-critico" onClick={dañoCritico} disabled={!!winner}>
          KAMEKAMEJA

          <br />

          <center>
            <img src="https://i.pinimg.com/webp85/736x/a8/b9/e5/a8b9e5f88149db0960c6d7f3c604dd98.webp" width={100} height={100} className="kamekameja" />
          </center>

        </button>
        <button className="btn-normal" onClick={dañoNormal} disabled={!!winner}>
          PUÑO NORMAL

          <br />
          <center>
            <img src="https://i.pinimg.com/736x/c6/49/58/c64958caf9a912ad9e1a6af7a3a8e642.jpg" width={100} height={100} className='puño' />
          </center>
        </button>
      </div>

      {winner && <div style={{ marginTop: 18, fontWeight: 800, color: '#eeff00' }}>Ganador: {winner}</div>}

      <div style={{ marginTop: 20 }}>
        <button className="btn-volver" onClick={() => navigate(-1)}>Volver
          <br />
          <center>
            <img src="https://i.pinimg.com/736x/8e/8b/8f/8e8b8fea6c962ebffaa411e5ba947ea8.jpg" width={20} height={20} className='atras' />
          </center>
        </button>
      </div>
    </div>
  );
}
