import { Link } from "react-router-dom";
import type { User } from "../types/api/UserType";
import type { Tache } from "../types/api/TacheType";
import TodoItem from "./TodoItem";

type Props = {
  user: User;
  taches: Tache[];
};

export default function UserCard({ user, taches }: Props) {
  const firstTask = taches[0];

  return (
    <Link to={`/user/${user.id}`} className="user-card" aria-label={`Voir détails de ${user.name}`}>
      <article className="app" aria-hidden="false">
        <header>
          <h2>{user.name}</h2>
          <p>{user.username}</p>
        </header>

        <section className="contact">
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.website}</p>
        </section>

        <section className="tasks">
          <h3>tache</h3>
          <TodoItem task={firstTask} />
        </section>
      </article>
    </Link>
  );
}
