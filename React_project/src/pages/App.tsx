import { useState, useEffect, useMemo } from "react";
import { getUser } from "../service/user";
import { getTache } from "../service/tache";
import type { Tache } from "../types/api/TacheType";
import type { User } from "../types/api/UserType";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import "../App.css"

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [taches, setTaches] = useState<Tache[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setError(null);
      try {
        const [usersData, tachesData] = await Promise.all([getUser(), getTache()]);
        setUsers(usersData);
        setTaches(tachesData);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement");
      }
    };

    fetchAll();
  }, []);

  const tachesParUser = useMemo(() => {
    return taches.reduce((acc, task) => {
      if (!acc[task.userId]) acc[task.userId] = [];
      acc[task.userId].push(task);
      return acc;
    }, {} as Record<number, Tache[]>);
  }, [taches]);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return users;
    return users.filter((u) => {
      return (
        u.name.toLowerCase().includes(q)
      );
    });
  }, [users, query]);

  if (error) return <div>{error}</div>;

  return (
    <div className="app">
      <SearchBar query={query} onChange={setQuery} placeholder="Rechercher..." />
      {filteredUsers.length === 0 ? (
        <div>Aucun utilisateur trouvé</div>
      ) : (
        filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} taches={tachesParUser[user.id] ?? []} />
        ))
      )}
    </div>
  );
}

export default App;
