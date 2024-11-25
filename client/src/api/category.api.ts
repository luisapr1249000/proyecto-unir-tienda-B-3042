import { api } from "../config/axios.config";
import { Category } from "../types/category";
import { PaginationResultCategories } from "../types/paginationResult";

export const getCategories = async ({
  page = 1,
  limit = 10,
  sort = "-createdAt",
}: {
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<PaginationResultCategories> => {
  const response = await api<PaginationResultCategories>(
    `/categories?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getCategoryById = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<Category> => {
  const response = await api<Category>(`/categories/${categoryId}`);
  return response.data;
};

export const getCategoryByName = async ({
  categoryName,
}: {
  categoryName: string;
}): Promise<Category> => {
  const response = await api<Category>(`/categories/name/${categoryName}`);
  return response.data;
};
