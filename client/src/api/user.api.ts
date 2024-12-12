import { api } from "../config/axios.config";
import {
  PaginationConfig,
  PaginationResultUsers,
} from "../types/paginationResult";
import { User, UserInput } from "../types/user";

export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await api<User>(`/users/username/${username}`);
  return response.data;
};

export const getUserById = async (userId: string): Promise<User> => {
  const response = await api<User>(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (data: UserInput): Promise<User> => {
  const response = await api.put<User>("/users", data);
  return response.data;
};

export const deleteUser = async (userId: string) =>
  await api.delete(`/users/${userId}`);

export const getUsersWithPagination = async ({
  limit,
  page,
  sort,
}: PaginationConfig): Promise<PaginationResultUsers> => {
  const response = await api<PaginationResultUsers>(
    `/users?page=${page}&limit=${limit}&sort=${sort}`
  );

  return response.data;
};
