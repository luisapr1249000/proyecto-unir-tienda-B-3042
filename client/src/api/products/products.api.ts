import { api } from "../../config/axios.config";
import { CategoryId } from "../../types/category";
import {
  PaginationConfig,
  PaginationResultProducts,
} from "../../types/paginationResult";
import { Product, ProductId, ProductInput } from "../../types/product";
import { UserId } from "../../types/user";

export const createProduct = async (product: ProductInput) => {
  const response = await api.post<Product>(`/products`, product);
  return response.data;
};

export const updateProduct = async (
  productId: string,
  product: ProductInput
) => {
  const response = await api.put<Product>(`/products/${productId}`, product);
  return response.data;
};

export const deleteProduct = async (productId: string) => {
  await api.delete(`/products/${productId}`);
};

export const uploadProductImage = async ({
  productId,
  files,
}: ProductId & { files: File[] }) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("file", file));
  const response = await api.post<Product>(
    `/products/${productId}/images`,
    formData
  );
  console.log(response);
  return response.data;
};

export const deleteImagesFromProduct = async (
  productId: string,
  images: string[]
) => {
  const queryString = images
    .map((image) => `deletedImages[]=${image}`)
    .join("&");
  await api.delete(
    `/products/${productId}/images?deletedImages=${queryString}`
  );
};

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
}: PaginationConfig & CategoryId): Promise<PaginationResultProducts> => {
  const response = await api<PaginationResultProducts>(
    `/products/category/${categoryId}?page${page}&limit=${limit}&sort=${sort}`
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
}: PaginationConfig & UserId): Promise<PaginationResultProducts> => {
  const response = await api<PaginationResultProducts>(
    `/products/author/${userId}?page${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};
