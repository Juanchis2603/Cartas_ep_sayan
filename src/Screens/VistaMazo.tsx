import { useEffect, useState, type ChangeEvent } from 'react';
import './VistaMazo.css';
import Cartas from '../Componentes/Cartas';
import CreaCarta from '../Componentes/CreaCarta';
import type { Card } from '../services/api';
import { deleteCard } from '../services/api';

export default function VistaMazo() {

  const getCartas = async () => {
    let urlAPI = 'https://educapi-v2.onrender.com/card';

    const respuesta = await fetch(urlAPI, {
      method: 'GET',
      headers: {
        usersecretpasskey: 'Juan263063EZ',
      },
    });

    const objeto = await respuesta.json();

    setCards(objeto.data);
    console.log(objeto);
  };

  const [cards, setCards] = useState<Card[]>([
    {
      idCard: 1,
      name: 'Goku Ultra Instinto',
      tipo: 'saiyan',
      attack: 99999,
      defense: 99999,
      lifePoints: 99999,
      description: 'Vida',
      pictureUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF7cwSE0ZUo0BGjprMAsrq3Dz6dJ4WEgGwNg&s',
    },
    {
      idCard: 2,
      name: 'Vegueta Super Saiyan',
      tipo: 'saiyan',
      attack: 7777,
      defense: 7777,
      lifePoints: 7777,
      description: 'SUPER',
      pictureUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh7n2s8XoVqj3l5mLZt1a9uKkH8n6b2cQ&s',  },
    {
      idCard: 3,
      name: 'Brolly',
      tipo: 'saiyan',
      attack: 8888,
      defense: 8888,
      lifePoints: 10000,
      description: 'SUPER',
      pictureUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh7n2s8XoVqj3l5mLZt1a9uKkH8n6b2cQ&s',},
  ]);

  const [selected, setSelected] = useState<Card | null>(null);
  const [editing, setEditing] = useState<Card | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    attack: 0,
    defense: 0,
    description:'',
    pictureUrl: ''
  });

  // recibir cartas nuevas desde el componente CreaCarta
  const handleAddCarta = (c: Card) => {
    setCards((prev) => [c, ...prev]);
  };

  const abrirDetalle = (c: Card) => {
    setSelected(c);
    // evitar scroll al abrir
    document.body.style.overflow = 'hidden';
  };

  // const eliminarCarta = async (idCarta: string) => {
  //   let urlAPI = 'https://educapi-v2.onrender.com/card/' + idCarta;

  //   const response = await fetch(urlAPI, {
  //     method: 'DELETE',
  //     headers: {
  //       usersecretpasskey: 'Juan263063EZ',
  //     },
  //   });
  //   if (response.status === 200 || response.status === 201) {
  //     getCartas();
  //   }
  // };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrarDetalle();
    };
    window.addEventListener('keydown', onKey);

    getCartas();

    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleDeleteCarta = async (id: number) => {
    try {
      await deleteCard(id);
      setCards((prev) => prev.filter((card) => card.idCard !== id));
    } catch (e) {
      console.error('Delete error:', e);
      alert('No se pudo eliminar la carta en el servidor.');
    }
  };

  const handleEditClick = (c: Card) => {
    setEditing(c);
    setEditForm({
      name: c.name,
      attack: c.attack,
      defense: c.defense,
      description: c.description || '',
      pictureUrl: c.pictureUrl
    });
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'attack' || name === 'defense' ? Number(value) : value
    }));
  };

  const handleSaveEdit = async () => {
    if (!editing) return;
    const urlAPI = `https://educapi-v2.onrender.com/card/${editing.idCard}`;
    try {
      const response = await fetch(urlAPI, {
        method: 'PATCH',
        headers: {
          usersecretpasskey: 'Juan263063EZ',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });
      if (response.ok) {
        getCartas(); // Recargar la lista desde el servidor
        setEditing(null);
      }
    } catch (e) {
      console.error('Update error:', e);
    }
  };

  const cerrarDetalle = () => {
    setSelected(null);
    document.body.style.overflow = '';
  };

  return (
    <div className='mazo-container'>
      <CreaCarta existingCartas={cards} onAddCarta={handleAddCarta} />

      <div className='grid' aria-live='polite'>
        {cards.map((c) => (
          <Cartas
            key={c.idCard}
            numero={c.idCard}
            nombre={c.name}
            tipo={c.tipo}
            ataque={c.attack}
            defensa={c.defense}
            descripcion={c.description}
            imagen={c.pictureUrl}
            onClick={() => abrirDetalle(c)}
            onDelete={handleDeleteCarta}
            onEdit={() => handleEditClick(c)}
          />
        ))}
      </div>

      {selected && (
        <div className='overlay' onClick={cerrarDetalle}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <button
              className='close'
              onClick={cerrarDetalle}
              aria-label='Cerrar'
            >
              ×
            </button>

            <div className='modal-card'>
              <img
                className='big-img'
                src={selected.pictureUrl}
                alt={selected.name}
              />
              <div className='info'>
                <h2>
                  {selected.name} <small>#{selected.idCard}</small>
                </h2>
                <p>
                  <strong>Tipo:</strong> {selected.tipo}
                </p>
                <p>
                  <strong>Ataque:</strong> {selected.attack}
                </p>
                <p>
                  <strong>Defensa:</strong> {selected.defense}
                </p>
                <p className='desc'>{selected.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className='overlay' onClick={() => setEditing(null)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <h2>Editar Carta #{editing.idCard}</h2>
            <div className='edit-form' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label>Nombre:</label>
              <input name="name" value={editForm.name} onChange={handleEditChange} />
              
              <label>Ataque:</label>
              <input type="number" name="attack" value={editForm.attack} onChange={handleEditChange} />
              
              <label>Defensa:</label>
              <input type="number" name="defense" value={editForm.defense} onChange={handleEditChange} />
              
              <label>Descripción:</label>
              <textarea name="description" value={editForm.description} onChange={handleEditChange} />
              
              <label>Imagen URL:</label>
              <input name="pictureUrl" value={editForm.pictureUrl} onChange={handleEditChange} />

              <div className='modal-actions'>
                <button className='btn-crea' onClick={handleSaveEdit}>Guardar</button>
                <button className='btn-cancel' onClick={() => setEditing(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}