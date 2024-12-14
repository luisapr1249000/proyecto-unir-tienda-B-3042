import { api } from "../config/axios.config";
import {
  PaginationConfig,
  PaginationOptionsCategoryId,
  PaginationOptionsCategoryName,
  PaginationOptionsUserId,
  PaginationResultProducts,
} from "../types/paginationResult";
import {
  Product,
  ProductId,
  ProductInput,
  ProductQuestionContent,
  ProductQuestionContentAnswer,
  ProductUpdateInput,
  ProductUserQuestionId,
} from "../types/product";
import { UserId } from "../types/user";
import { mergePaginationOptions } from "../utils/api.utils";

export const getProductsWithPagination = async ({
  page,
  limit,
  sort,
}: PaginationConfig): Promise<PaginationResultProducts> => {
  const response = await api<PaginationResultProducts>(
    `/products?page=${page}&limit=${limit}&sort=${sort}`
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

export const createUserQuestionForOneProduct = async ({
  productId,
  questionContent,
}: ProductId & ProductQuestionContent): Promise<Product> => {
  const response = await api.post<Product>(
    `/products/${productId}/questions`,
    questionContent
  );
  return response.data;
};

export const updateUserQuestionForOneProduct = async ({
  productId,
  questionContent,
  userQuestionId,
}: ProductId &
  ProductQuestionContent &
  ProductUserQuestionId): Promise<Product> => {
  const response = await api.put<Product>(
    `/products/${productId}/questions/${userQuestionId}`,
    questionContent
  );
  return response.data;
};
export const answerUserQuestionForOneProduct = async ({
  productId,
  answerContent,
  userQuestionId,
}: ProductId &
  ProductQuestionContentAnswer &
  ProductUserQuestionId): Promise<Product> => {
  const response = await api.put<Product>(
    `/products/${productId}/questions/${userQuestionId}/answer`,
    answerContent
  );
  return response.data;
};

export const deleteUserQuestionForOneProduct = async ({
  productId,
  userQuestionId,
}: ProductId & ProductUserQuestionId) => {
  await api.delete<Product>(
    `/products/${productId}/questions/${userQuestionId}/answer`
  );
};

export const searchProductsWithPagination = async (
  query: string,
  paginationConfig: PaginationConfig = {}
): Promise<PaginationResultProducts> => {
  const { limit, page, sort } = mergePaginationOptions(paginationConfig);
  const response = await api<PaginationResultProducts>(
    `/products/search-product?query=${query}&page${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const createProduct = async (product: ProductInput) => {
  const response = await api.post<Product>(`/products`, product);
  return response.data;
};

export const updateProduct = async (product: ProductUpdateInput) => {
  const response = await api.put<Product>(`/products`, product);
  return response.data;
};

export const deleteProduct = async (productId: ProductId) => {
  await api.delete(`/products/${productId}`);
};

export const uploadImage = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("file", file));
  const response = await api.post<Product>(`/products/images`, formData);
  return response.data;
};
