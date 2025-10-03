interface Tache {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type GetTacheResponse = Tache[];
export type { Tache, GetTacheResponse };