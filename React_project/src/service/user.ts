import type { User, GetUserResponse } from "../types/api/UserType";
import api from "./api";

const getUser = async (): Promise<GetUserResponse> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export { getUser };
