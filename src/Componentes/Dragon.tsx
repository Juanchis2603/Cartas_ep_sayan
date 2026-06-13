import { useNavigate, useLocation } from 'react-router-dom';
import './Dragon.css';
import { useEffect, useRef, useState } from 'react';

const DRAGON_BASE64 = 'data:image/jpeg;base64,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';

export default function Dragon() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [count, setCount] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [pos, setPos] = useState<{ left: string; top: string }>({ left: '50%', top: '50%' });
  const spawnTimeout = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [summoned, setSummoned] = useState<boolean>(false);

  const spawn = () => {
    const left = Math.floor(Math.random() * 70) + 10; // 10% - 80%
    const top = Math.floor(Math.random() * 60) + 10; // 10% - 70%
    setPos({ left: `${left}%`, top: `${top}%` });
    setVisible(true);
    if (spawnTimeout.current) window.clearTimeout(spawnTimeout.current);
    // duración más corta para que la bola desaparezca antes
    spawnTimeout.current = window.setTimeout(() => setVisible(false), 2000);
  };

  useEffect(() => {
    // start periodic spawn
    // intervalo reducido para que las bolas aparezcan con mayor frecuencia
    intervalRef.current = window.setInterval(() => {
      setVisible((v) => {
        if (!v) spawn();
        return v;
      });
    }, 1000 + Math.random() * 1000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (spawnTimeout.current) window.clearTimeout(spawnTimeout.current);
    };
  }, []);

  const handleClick = () => {
    setCount((prev) => {
      const next = Math.min(7, prev + 1);
      if (next === 7) {
        // stop future spawns and mark summoned
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        if (spawnTimeout.current) window.clearTimeout(spawnTimeout.current);
        setSummoned(true);
        setVisible(false);
      }
      return next;
    });
    setVisible(false);
    if (spawnTimeout.current) window.clearTimeout(spawnTimeout.current);
  };

  // CURACIÓN: suma defensa a vida y reduce defensa del objetivo (el que tenía el turno)
  const handleCuracion = () => {
    const incoming = state?.cards ?? [];
    const currentTurn: number = state?.turn ?? 0;
    if (!incoming || incoming.length < 2) return;

    const updated = incoming.map((c: any) => ({ ...c }));
    const target = updated[currentTurn];
    const def = target.defense ?? 0;
    target.lifePoints = (target.lifePoints ?? 100) + def;
    target.defense = Math.max(0, (target.defense ?? 0) - def);

    // persistir para que Batalla aplique los cambios
    localStorage.setItem('battle-updated', JSON.stringify({ cards: updated }));
    // dejar la imagen invocada visible
    setSummoned(true);
  };

  // INVOCAR COMPAÑERO: toma carta aleatoria del mazo (localStorage 'mazo') y la adjunta
  const handleSummonCompanion = () => {
    const incoming = state?.cards ?? [];
    const currentTurn: number = state?.turn ?? 0;
    if (!incoming || incoming.length < 2) return;

    let deck: any[] = [];
    try { deck = JSON.parse(localStorage.getItem('mazo') || '[]'); } catch { deck = []; }

    let companion: any = null;
    if (deck.length > 0) {
      const existing = new Set(incoming.map((c: any) => c.idCard));
      const candidates = deck.filter((d: any) => !existing.has(d.idCard));
      companion = (candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : deck[Math.floor(Math.random() * deck.length)]);
    }
    if (!companion) companion = { idCard: Date.now(), name: 'Compañero', attack: 30, defense: 20, lifePoints: 80, pictureUrl: '' };

    const payload = { cards: incoming.map((c: any) => ({ ...c })), companion: { card: companion, attachToIndex: currentTurn, extraTurnForId: companion.idCard } };
    localStorage.setItem('battle-updated', JSON.stringify(payload));
    localStorage.setItem('battle-extra-turn', String(companion.idCard));
    setSummoned(true);
  };

  return (
    <div className="dragon-page">
      <h2>Bolas del Dragon</h2>

      <div className="dragon-counter">Contador: <strong>{count}</strong></div>

      <div className="dragon-content">
        <img src="data:image/jpeg;base64,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" alt="Bolas del Dragon" />
        <p>Reúne las 7 bolas y invoca al dragón. Haz clic en las bolas que aparezcan.</p>
      </div>

      {/* Popup imagen que aparece aleatoriamente */}
      {!summoned && visible && (
        <div
          className="dragon-popup"
          style={{ left: pos.left, top: pos.top }}
          onClick={handleClick}
          role="button"
        >
          <img src={DRAGON_BASE64} alt="bola" />
        </div>
      )}

      {/* Imagen final cuando se juntan las 7 bolas */}
      {summoned && (
        <div className="dragon-summoned">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1R69oKYco2_Q5_5ACe-tA-ZGME9I2NN2K-g&s" alt="Dragon invocado" />

          <div className="summon-actions">
            <button className="btn-curacion" onClick={handleCuracion}>Curación</button>
            <button className="btn-companion" onClick={handleSummonCompanion}>Invocar compañero</button>
          </div>

          <div style={{ marginTop: 12 }}>
            <button className="btn-volver" onClick={() => { setSummoned(false); setCount(0); navigate(-1); }}>Volver</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <button className="btn-volver" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
}

