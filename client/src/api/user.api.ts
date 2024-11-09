import { api } from "../config/axios.config";
import { User } from "../types/user";

export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await api(`/users/username/${username}`);
  return response.data;
};

export const getUserById = async (userId: string): Promise<User> => {
  const response = await api(`/users/${userId}`);
  return response.data;
};
