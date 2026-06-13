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
      const damage = (a.attack ?? 50);
      setLifeB((prev) => Math.max(0, prev - damage));
      setTurn(1);
    } else {
      const damage = (b.attack ?? 50);
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
      <button className="dragon-button" onClick={() => navigate('/dragon')}>
        <img src="data:image/jpeg;base64,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" alt="Bolas del dragon" />
        bolas del dragon
      </button>
      <h2> {a.name} VS {b.name}</h2>
      <div className="turn-indicator">Turno: <strong>{turn === 0 ? a.name : b.name}</strong>
        <br />
        <br />
        <center>
          <img src="https://i.pinimg.com/736x/e5/52/34/e5523410c9e108b7d5f063bb0403635a.jpg" width={100} height={100} alt="" className='logo' />
        </center>
      </div>

      <div className="batalla-grid">
        <div className={`batalla-card ${turn === 0 ? 'active' : ''}`}>
          <img src={a.pictureUrl} alt={a.name} />
          <h3>{a.name}</h3>
          <p>Ataque: {a.attack}</p>
          <p>Defensa: {a.defense}</p>
          <p>Vida: <strong>{lifeA}</strong></p>
        </div>

        <div className="batalla-vs">VS</div>

        <div className={`batalla-card ${turn === 1 ? 'active' : ''}`}>
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
