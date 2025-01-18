import { api } from "../config/axios.config";
import {
  Category,
  CategoryId,
  CategoryInput,
  CategoryName,
} from "../types/category";
import {
  PaginationConfig,
  PaginationResultCategories,
} from "../types/paginationResult";

export const getCategoriesWithPagination = async ({
  page = 1,
  limit = 10,
  sort = "-createdAt",
}: PaginationConfig): Promise<PaginationResultCategories> => {
  const response = await api<PaginationResultCategories>(
    `/categories?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getCategoryById = async ({
  categoryId,
}: CategoryId): Promise<Category> => {
  const response = await api<Category>(`/categories/${categoryId}`);
  return response.data;
};

export const getCategoryByName = async ({
  categoryName,
}: CategoryName): Promise<Category> => {
  const response = await api<Category>(`/categories/name/${categoryName}`);
  return response.data;
};

export const createCategory = async (category: CategoryInput) => {
  const response = await api.post<Category>(`/categories`, category);
  return response.data;
};

export const updateCategory = async ({
  categoryId,
  data,
}: {
  categoryId: string;
  data: CategoryInput;
}) => {
  const response = await api.put<Category>(`/categories/${categoryId}`, data);
  return response.data;
};

export const deleteCategory = async (categoryId: string) => {
  await api.delete(`/categories/${categoryId}`);
};
