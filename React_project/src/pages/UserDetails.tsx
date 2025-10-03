import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { User } from "../types/api/UserType";
import type { Tache } from "../types/api/TacheType";
import { getUser } from "../service/user";
import { getTache } from "../service/tache";
import TodoForm from "../components/TodoForm";

export default function UserDetail() {
  const { userid } = useParams<{ userid: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [taches, setTaches] = useState<Tache[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userid) return;
    const idNum = Number(userid);
    if (Number.isNaN(idNum)) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      setError(null);
      try {
        const users = await getUser();
        setUser(users.find((u) => u.id === idNum) ?? null);

        const allTaches = await getTache();
        setTaches(allTaches.filter((t) => t.userId === idNum));
      } catch (err) {
        console.error(err);
        setError("Erreur de chargement");
      }
    };

    fetchData();
  }, [userid, navigate]);

  const handleAdded = (newTask: Tache) => {
    setTaches((prev) => {
      const exists = prev.find((p) => p.id === newTask.id);
      if (exists) {
        return prev.map((p) => (p.id === newTask.id ? newTask : p));
      }
      if (newTask.id > 0) {
        const withoutTemp = prev.filter((p) => p.id < 0 );
        return [...withoutTemp, newTask];
      }
      return [...prev, newTask];
    });
  };

  if (error) return <div>{error}</div>;
  if (!user) return <div>Utilisateur introuvable</div>;

  return (
    <main className="user-details">
      <section className="user_info">
        <h1>{user.name}</h1>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
      </section>

      <section className="liste_tache_user">
        <h2>Taches ({taches.length})</h2>
        <br></br>

        <TodoForm userId={user.id} onAdded={handleAdded} />

        {taches.length === 0 ? (
          <p>Aucune tâche</p>
        ) : (
          <ul>
            {taches.map((t) => (
              <li key={t.id}>
                <strong>{t.title}</strong> — {t.completed ? "Completed" : "Not Completed"}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

