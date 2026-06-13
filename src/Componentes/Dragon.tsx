import { useNavigate } from 'react-router-dom';
import './Dragon.css';
import { useEffect, useRef, useState } from 'react';

const DRAGON_BASE64 = 'data:image/jpeg;base64,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';

export default function Dragon() {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [pos, setPos] = useState<{ left: string; top: string }>({ left: '50%', top: '50%' });
  const spawnTimeout = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const spawn = () => {
    const left = Math.floor(Math.random() * 70) + 10; // 10% - 80%
    const top = Math.floor(Math.random() * 60) + 10; // 10% - 70%
    setPos({ left: `${left}%`, top: `${top}%` });
    setVisible(true);
    if (spawnTimeout.current) window.clearTimeout(spawnTimeout.current);
    spawnTimeout.current = window.setTimeout(() => setVisible(false), 2500);
  };

  useEffect(() => {
    // start periodic spawn
    intervalRef.current = window.setInterval(() => {
      // only spawn if not currently visible
      setVisible((v) => {
        if (!v) spawn();
        return v;
      });
    }, 3000 + Math.random() * 3000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (spawnTimeout.current) window.clearTimeout(spawnTimeout.current);
    };
  }, []);

  const handleClick = () => {
    setCount((c) => c + 1);
    setVisible(false);
    if (spawnTimeout.current) window.clearTimeout(spawnTimeout.current);
  };

  return (
    <div className="dragon-page">
      <h2>Bolas del Dragon</h2>

      <div className="dragon-counter">Contador: <strong>{count}</strong></div>

      <div className="dragon-content">
        <img src="https://upload.wikimedia.org/wikipedia/en/7/7b/Dragon_Balls.png" alt="Bolas del Dragon" />
        <p>Reúne las 7 bolas y invoca al dragón. Haz clic en las bolas que aparezcan.</p>
      </div>

      {/* Popup imagen que aparece aleatoriamente */}
      {visible && (
        <div
          className="dragon-popup"
          style={{ left: pos.left, top: pos.top }}
          onClick={handleClick}
          role="button"
        >
          <img src={DRAGON_BASE64} alt="bola" />
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <button className="btn-volver" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
}

