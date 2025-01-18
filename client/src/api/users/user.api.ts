import { api } from "../../config/axios.config";
import {
  PaginationConfig,
  PaginationResultUsers,
} from "../../types/paginationResult";
import { User, UserId, UserInput } from "../../types/user";

export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await api<User>(`/users/username/${username}`);
  return response.data;
};

export const getUserById = async (userId: string): Promise<User> => {
  const response = await api<User>(`/users/${userId}`);
  return response.data;
};

export const updateUser = async ({
  userId,
  data,
}: { data: UserInput } & UserId): Promise<User> => {
  const response = await api.put<User>(`/users/${userId}`, data);
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

export const uploadUserAvatar = async (data: File) => {
  const formData = new FormData();
  formData.append("file", data);
  const response = await api.post<User>(`/users/avatar`, formData);
  return response.data;
};
