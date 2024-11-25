import { api } from "../config/axios.config";
import {
  PaginationConfig,
  PaginationOptionsCategoryId,
  PaginationOptionsCategoryName,
  PaginationOptionsUserId,
  PaginationResultProducts,
} from "../types/paginationResult";
import { Product, ProductId } from "../types/product";
import { UserId } from "../types/user";

export const getProductsWithPagination = async ({
  page,
  limit,
  sort,
}: PaginationConfig): Promise<PaginationResultProducts> => {
  const response = await api<PaginationResultProducts>(
    `/products?page${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getProductsByCategoryWithPagination = async ({
  categoryId,
  page,
  limit,
  sort,
}: PaginationOptionsCategoryId): Promise<PaginationResultProducts> => {
  const response = await api<PaginationResultProducts>(
    `/products/category/${categoryId}?page${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getProductsByCategoryByNameWithPagination = async ({
  categoryName,
  page = 1,
  limit = 10,
  sort = "-createdAt",
}: PaginationOptionsCategoryName): Promise<PaginationResultProducts> => {
  const response = await api<PaginationResultProducts>(
    `/products/category/${categoryName}?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getProductsByCategoryByIdWithPagination = async ({
  categoryId,
  page = 1,
  limit = 10,
  sort = "-createdAt",
}: PaginationOptionsCategoryId): Promise<PaginationResultProducts> => {
  const response = await api(
    `/products/category/${categoryId}?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getProductById = async ({
  productId,
}: ProductId): Promise<Product> => {
  const response = await api<Product>(`/products/${productId}`);
  return response.data;
};

export const getProductstByAuthorWithPagination = async ({
  userId,
  limit,
  page,
  sort,
}: PaginationOptionsUserId): Promise<PaginationResultProducts> => {
  const response = await api<PaginationResultProducts>(
    `/products/author/${userId}?page${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};
