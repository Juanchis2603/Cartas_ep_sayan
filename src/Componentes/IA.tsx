import { useState } from "react";
import "./IA.css";
import { createCard } from "../services/api";
import type { Card } from "../services/api";

const AI_ENDPOINT = "https://educapi-v2.onrender.com/ai/generate-card";
const USER_SECRET = "Juan263063EZ";

export default function IA() {
  const [globalContext, setGlobalContext] = useState(
    "Temática: cartas de batalla tipo coleccionable; rangos: ataque 0-100, defensa 0-50, vida 100-300"
  );
  const [cardPrompt, setCardPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<Card | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setSavedMsg(null);
    if (!cardPrompt.trim()) {
      setError("Escribe una descripción para la carta (cardPrompt).");
      return;
    }
    setLoading(true);
    try {
      const payload = { globalContext, cardPrompt };
      const res = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          usersecretpasskey: USER_SECRET,
        } as any,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Status ${res.status} - ${txt}`);
      }
      const data = await res.json();
      // la API documentada devuelve la carta generada en el body
      // normalizamos a la interface Card
      const card: Card = {
        idCard: data.idCard ?? Math.floor(Math.random() * 100000),
        name: data.name ?? data.nombre ?? "Carta IA",
        description: data.description ?? data.descripcion ?? `Generada por IA: ${cardPrompt}`,
        attack: Number(data.attack ?? data.ataque ?? 45),
        defense: Number(data.defense ?? data.defensa ?? 30),
        lifePoints: Number(data.lifePoints ?? data.vida ?? 150),
        pictureUrl: data.pictureUrl ?? data.pictureUrl ?? "",
        attributes: data.attributes ?? data.atributos ?? {},
      };
      setGenerated(card);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Error generando carta");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generated) return;
    setSavedMsg(null);
    try {
      const toSave = {
        name: generated.name,
        description: generated.description ?? "",
        attack: generated.attack ?? 0,
        defense: generated.defense ?? 0,
        lifePoints: generated.lifePoints ?? 100,
        pictureUrl: generated.pictureUrl ?? "",
        attributes: generated.attributes ?? {},
      };
      await createCard(toSave);
      setSavedMsg("Carta guardada en la colección.");
    } catch (e) {
      console.error(e);
      setError("Error al guardar la carta");
    }
  };

  return (
    <div className="ia-panel">
      <h3>Generador IA de Cartas</h3>
      <p className="helper">Escribe las indicaciones para la IA. Usa el contexto global para definir tema y rangos.</p>

      <label className="label">Contexto global</label>
      <textarea value={globalContext} onChange={(e) => setGlobalContext(e.target.value)} />

      <label className="label">Descripción de la carta (cardPrompt)</label>
      <textarea placeholder="Ej: Una criatura dragón voladora, color rojizo, con gran ataque y habilidad de fuego" value={cardPrompt} onChange={(e) => setCardPrompt(e.target.value)} />

      <div className="controls">
        <button className="btn-gen" onClick={handleGenerate} disabled={loading}>{loading ? 'Generando...' : 'Generar carta IA'}</button>
        {generated && <button className="btn-save" onClick={handleSave}>Guardar carta</button>}
      </div>

      {error && <div className="error">{error}</div>}
      {savedMsg && <div className="saved">{savedMsg}</div>}

      {generated && (
        <div className="preview">
          <h4>Previsualización</h4>
          <div className="card-preview">
            <img src={generated.pictureUrl || ""} alt={generated.name} />
            <div className="info">
              <h5>{generated.name}</h5>
              <p><strong>Ataque:</strong> {generated.attack}</p>
              <p><strong>Defensa:</strong> {generated.defense}</p>
              <p><strong>Vida:</strong> {generated.lifePoints}</p>
              <p className="desc">{generated.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
