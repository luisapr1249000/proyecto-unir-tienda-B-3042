import { api } from "../../config/axios.config";
import {
  PaginationOptions,
  SearchQueryOptions,
  UserPaginationResults,
} from "../../types/query";
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
  query,
}: PaginationOptions & SearchQueryOptions): Promise<UserPaginationResults> => {
  const sellerQuery = query ? `&isSeller=${query}` : "";

  const response = await api<UserPaginationResults>(
    `/users?page=${page}&limit=${limit}&sort=${sort}${sellerQuery}`
  );

  return response.data;
};

export const uploadUserAvatar = async (data: File) => {
  const formData = new FormData();
  formData.append("file", data);
  const response = await api.post<User>(`/users/avatar`, formData);
  return response.data;
};
