import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VistaMazo.css';

type CardData = {
  idCard: number;
  name: string;
  tipo: string;
  attack: number;
  defense: number;
  lifePoints: number;
  description: string;
  pictureUrl: string;
};

export default function DetalleCartaPage() {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<CardData | null>(null);
  const API_BASE = import.meta.env.DIREC_API || 'https://educapi-v2.onrender.com';

  useEffect(() => {
    if (!id) return;
    const fetchCard = async () => {
      try {
        const res = await fetch(`${API_BASE}/card/${id}`, {
          headers: { 'usersecretpasskey': 'Juan263063EZ' }
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setCard(data);
      } catch (e) {
        console.error('Error fetching card', e);
      }
    };
    fetchCard();
  }, [id]);

  if (!card) return <div style={{ padding: 20 }}>Cargando carta...</div>;

  return (
    <div className="detalle-page" style={{ padding: 20 }}>
      <h2>{card.name} <small>#{card.idCard}</small></h2>
      <div className="modal-card">
        <img className="big-img" src={card.pictureUrl} alt={card.name} />
        <div className="info">
          <p><strong>Tipo:</strong> {card.tipo}</p>
          <p><strong>Ataque:</strong> {card.attack}</p>
          <p><strong>Defensa:</strong> {card.defense}</p>
          <p className="desc">{card.description}</p>
        </div>
      </div>
    </div>
  );
}
