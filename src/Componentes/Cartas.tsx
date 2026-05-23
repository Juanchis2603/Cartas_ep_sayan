import React from "react";
import "./Cartas.css"

type Props = {
  numero: number;
  nombre: string;
  tipo: string | undefined;
  ataque?: number;
  defensa?: number;
  descripcion: string | undefined;
  imagen: string;
  onClick?: () => void;
  onDelete?: (id: number) => void;
  onEdit?: () => void;
  isSelected?: boolean;
};

function Cartas({
  ataque = 0,
  defensa = 0,
  descripcion = "Sin descripcion",
  imagen,
  nombre = "Sin nombre",
  numero = 0,
  tipo = "electrico",
  onClick,
  onDelete,
  onEdit,
  isSelected = false,


}: Props) {

   const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(numero);
  };
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick && onClick(); }}
    >
      <h3 className="card-title"><span className="name">{nombre}</span> <span className="num">#{numero}</span></h3>
      <img src={imagen} alt={nombre} />
      <p className="type"><span className="icon">⚡</span>Tipo: {tipo}</p>
      <p><span className="icon">🗡️</span>Ataque: {ataque}</p>
      <p><span className="icon">🛡️</span>Defensa: {defensa}</p>
      <p className="desc"><span className="icon">✨</span>{descripcion}</p>
      <button className="btn-edit" onClick={handleEditClick} aria-label={`Editar carta ${nombre}`}>Editar</button>
      <button className="btn-delete" onClick={handleDeleteClick} aria-label={`Borrar carta ${nombre}`}>Borrar</button>
    </div>
  );
}
export default Cartas