import { useEffect, useRef, useState } from "react";
import "./CreaCarta.css";

type NuevaCarta = {
  idCard: number;
  name: string;
  tipo: string;
  attack: number;
  defense: number;
  lifePoints: number;
  description: string;
  pictureUrl: string;
};

type Props = {
  existingCartas?: NuevaCarta[];
  onAddCarta?: (c: NuevaCarta) => void;
};

export default function CreaCarta({ existingCartas = [], onAddCarta }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [ataque, setAtaque] = useState<number | "">("");
  const [defensa, setDefensa] = useState<number | "">("");
  const [vida, setVida] = useState<number | "">("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // si se actualiza existingCartas podría usarse aquí
  }, [existingCartas]);

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => {
    setModalOpen(false);
    limpiar();
  };
  const limpiar = () => {
    setNombre("");
    setAtaque("");
    setDefensa("");
    setVida("");
    setImagenUrl("");
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFile = (f?: File) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result as string;
      setPreview(res);
      setImagenUrl(res);
    };
    reader.readAsDataURL(f);
  };

  const handleCreate = async () => {
    const a = Number(ataque);
    const d = Number(defensa);
    const v = Number(vida);

    if (!nombre.trim() || !imagenUrl || ataque === "" || defensa === "" || vida === "") {
      alert("Rellena Nombre, Ataque, Defensa, Vida e Imagen.");
      return;
    }

    // Preparar payload para la API
    const payload = {
      name: nombre.trim(),
      tipo: "saiyan",
      attack: a,
      defense: d,
      lifePoints: v,
      description: `Vida: ${v}`,
      pictureUrl: imagenUrl,
    };

    const API_BASE = import.meta.env.DIREC_API || "https://educapi-v2.onrender.com";
    const CARD_ENDPOINT = `${API_BASE}/card`;

    try {
      const res = await fetch(CARD_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "UsersScretPasskey": "Juan263063EZ",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed to create card: ${res.status}`);
      }

      const created = await res.json();

      // Si el servidor devuelve la carta creada, la usamos; si no, creamos un fallback local
      if (onAddCarta) {
        const toAdd: NuevaCarta = created && created.idCard ? created : {
          idCard: created && created.idCard ? created.idCard : (existingCartas && existingCartas.length > 0 ? Math.max(...existingCartas.map((c) => c.idCard)) + 1 : Date.now()),
          name: payload.name,
          tipo: payload.tipo,
          attack: payload.attack,
          defense: payload.defense,
          lifePoints: payload.lifePoints,
          description: payload.description,
          pictureUrl: payload.pictureUrl,
        };
        onAddCarta(toAdd);
      }

      cerrarModal();
    } catch (e) {
      console.error("Create error:", e);
      alert("No se pudo crear la carta en el servidor. Se añadirá localmente.");
      // fallback local
      const numero = existingCartas && existingCartas.length > 0
        ? Math.max(...existingCartas.map((c) => c.idCard)) + 1
        : Date.now();

      const nueva: NuevaCarta = {
        idCard: numero,
        name: nombre.trim(),
        tipo: "saiyan",
        attack: a,
        defense: d,
        lifePoints: v,
        description: `Vida: ${v}`,
        pictureUrl: imagenUrl,
      };

      if (onAddCarta) onAddCarta(nueva);
      cerrarModal();
    }
  };

  return (
    <>
      <div className="crea-carta-wrapper">
        <button className="btn-crea-tarjeta" onClick={abrirModal}>
          Crea Tu Carta
        </button>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onMouseDown={cerrarModal}>
          <div className="modal-contenedor" onMouseDown={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Crea tu carta</h3>

            <label className="field-label">Nombre</label>
            <input
              className="field-input"
              type="text"
              placeholder="Nombre de la carta..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label className="field-label">Ataque</label>
            <input
              className="field-input"
              type="number"
              min={0}
              value={ataque}
              onChange={(e) => setAtaque(e.target.value === "" ? "" : Number(e.target.value))}
            />

            <label className="field-label">Defensa</label>
            <input
              className="field-input"
              type="number"
              min={0}
              value={defensa}
              onChange={(e) => setDefensa(e.target.value === "" ? "" : Number(e.target.value))}
            />

            <label className="field-label">Vida</label>
            <input
              className="field-input"
              type="number"
              min={0}
              value={vida}
              onChange={(e) => setVida(e.target.value === "" ? "" : Number(e.target.value))}
            />

            <label className="field-label">Imagen (URL o archivo)</label>
            <input
              className="field-input"
              type="text"
              placeholder="Pega URL..."
              value={imagenUrl}
              onChange={(e) => {
                setImagenUrl(e.target.value);
                setPreview(e.target.value);
              }}
            />
            <input
              ref={fileRef}
              className="field-file"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />

            {preview && (
              <div className="preview">
                <img src={preview} alt="preview" />
              </div>
            )}

            <div className="modal-actions">
              <button className="btn-cancel" onClick={cerrarModal}>Cancelar</button>
              <button className="btn-crea" onClick={handleCreate}>Crea</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}