import { useQuery } from "@tanstack/react-query";
import {
  PaginationOptionAndQueryKey,
  PaginationOptionCategoryIdAndQueryKey,
  PaginationOptionCategoryNameAndQueryKey,
  PaginationOptionUserIdAndQueryKey,
} from "../types/paginationResult";
import {
  getProductById,
  getProductsByCategoryByIdWithPagination,
  getProductsByCategoryByNameWithPagination,
  getProductsByCategoryWithPagination,
  getProductstByAuthorWithPagination,
  getProductsWithPagination,
} from "../api/product.api";
import { ProductId } from "../types/product";

export const useGetProductsWithPagination = ({
  queryKey,
  page,
  limit,
  sort,
}: PaginationOptionAndQueryKey) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => getProductsWithPagination({ page, limit, sort }),
  });
};

export const useGetProductsByAuthorWithPagination = ({
  queryKey,
  userId,
  limit,
  page,
  sort,
}: PaginationOptionUserIdAndQueryKey) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () =>
      getProductstByAuthorWithPagination({ userId, page, limit, sort }),
  });
};

export const useGetProductsByCategoryByNameWithPagination = ({
  queryKey,
  categoryName,
  page,
  limit,
  sort,
}: PaginationOptionCategoryNameAndQueryKey) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () =>
      getProductsByCategoryByNameWithPagination({
        categoryName,
        page,
        limit,
        sort,
      }),
  });
};

export const useGetProductsByCategoryByIdWithPagination = ({
  queryKey,
  categoryId,
  page,
  limit,
  sort,
  enabled,
}: PaginationOptionCategoryIdAndQueryKey) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () =>
      getProductsByCategoryByIdWithPagination({
        categoryId,
        page,
        limit,
        sort,
      }),
    enabled: !!enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetProductById = ({ productId }: ProductId) => {
  return useQuery({
    queryKey: [`product-${productId}`],
    queryFn: () => getProductById({ productId }),
  });
};
