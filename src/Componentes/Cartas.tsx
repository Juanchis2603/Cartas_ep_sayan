import "./Cartas.css"
import React from "react"

type Props = {
  numero: number;
  nombre: string;
  tipo: string;
  ataque?: number;
  defensa?: number;
  descripcion: string;
  imagen: string;
  onClick?: () => void;
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





}: Props) {

  return (
    <div
      className="card"
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
    </div>
  );
}
export default Cartas