import { api } from "../../config/axios.config";
import { Product, ProductId, ProductInput } from "../../types/product";
import {
  ProductPaginationAndSortOptions,
  ProductPaginationResults,
} from "../../types/query";

export const createProduct = async (product: ProductInput) => {
  const response = await api.post<Product>(`/products`, product);
  return response.data;
};

export const updateProduct = async ({
  productId,
  data,
}: ProductId & { data: ProductInput }) => {
  const response = await api.put<Product>(`/products/${productId}`, data);
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
  page = 1,
  limit = 10,
  sort = "-createdAt",
  maxPrice = 1,
  minPrice = Infinity,
  userId,
  categoryId,
  query,
}: ProductPaginationAndSortOptions): Promise<ProductPaginationResults> => {
  const groupByUserId = userId ? `&authorId=${userId}` : "";
  const groupByCategoryId = categoryId ? `&categoryId=${categoryId}` : "";
  const hasSearchQuery = query ? `&searchQuery=${query}` : "";
  const response = await api<ProductPaginationResults>(
    `/products?page=${page}&limit=${limit}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}${groupByUserId}${groupByCategoryId}${hasSearchQuery}`
  );
  return response.data;
};

export const getProductById = async ({
  productId,
}: ProductId): Promise<Product> => {
  const response = await api<Product>(`/products/${productId}`);
  return response.data;
};
