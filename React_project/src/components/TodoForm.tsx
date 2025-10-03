import React, { useState } from "react";
import type { Tache } from "../types/api/TacheType";
import { createTache } from "../service/tache";

type Props = {
  userId: number;
  onAdded: (task: Tache) => void;
};

export default function TodoForm({ userId, onAdded }: Props) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!title.trim()) { setError("Met le titre afou"); return; }
  setError(null);

  const payload = { userId, title: title.trim(), completed: false };

  try {
    const saved = await createTache(payload);
    onAdded(saved);
  } catch (err) {
    console.error(err);
    setError("Impossible d'ajouter la tâche");
  } finally {
    setTitle("");
  }
};


  return (
    <form className="tache-form" onSubmit={handleSubmit}>
      <label className="add_text_task">
        <input className="input_task"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nouvelle tâche"
          aria-label="Titre de la tâche"
        />
      </label>

      <button type="submit"  className="add_task">
        Ajouter
      </button>

      {error && <div role="alert" className="form-error">{error}</div>}
    </form>
  );
}
