import type { Tache } from "../types/api/TacheType";
import api from "./api";

const getTache = async (): Promise<Tache[]> => {
  const response = await api.get<Tache[]>("/todos");
  return response.data;
};

const createTache = async (payload: Omit<Tache, "id">): Promise<Tache> => {
  const response = await api.post<Tache>("/todos", payload);
  return response.data;
};

export { getTache, createTache };
