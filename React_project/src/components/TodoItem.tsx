import type { Tache } from "../types/api/TacheType";

type Props = {
  task?: Tache;
};

export default function TodoItem({ task }: Props) {
  if (!task) return <div>Aucune tâche</div>;

  return (
    <div className="task-preview">
      <strong>{task.title}</strong> — {task.completed ? "Completed" : "Not Completed"}
    </div>
  );
}
