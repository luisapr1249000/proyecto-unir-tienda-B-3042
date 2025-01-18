import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginatedQueryOptions, QueryKey } from "../types/paginationResult";
import { mergePaginationOptions } from "../utils/api.utils";
import {
  getProductById,
  getProductsByCategoryWithPagination,
  getProductstByAuthorWithPagination,
  getProductsWithPagination,
} from "../api/products/products.api";
import { UserId } from "../types/user";
import { CategoryId } from "../types/category";
import { ProductId } from "../types/product";

export const useGetProductsWithPagination = (
  options: PaginatedQueryOptions = {}
) => {
  const { limit, page, sort, queryKey, isKeepPreviousData } = {
    ...mergePaginationOptions(options),
    ...options,
  };
  return useQuery({
    queryKey: queryKey ?? ["products", { page, limit, sort }],
    queryFn: () => getProductsWithPagination({ page, limit, sort }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
  });
};

export const useGetProductsByAuthorWithPagination = (
  options: PaginatedQueryOptions & UserId = { userId: "" }
) => {
  const { limit, page, sort, queryKey, isKeepPreviousData, userId } = {
    ...mergePaginationOptions(options),
    ...options,
  };
  return useQuery({
    queryKey: queryKey ?? ["products", { page, limit, sort }],
    queryFn: () =>
      getProductstByAuthorWithPagination({
        page,
        limit,
        sort,
        userId: userId,
      }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
  });
};

export const useGetProductsByCategoryWithPagination = (
  options: PaginatedQueryOptions & CategoryId = { categoryId: "" }
) => {
  const { limit, page, sort, queryKey, isKeepPreviousData, categoryId } = {
    ...mergePaginationOptions(options),
    ...options,
  };
  return useQuery({
    queryKey: queryKey ?? [
      `products-category-${categoryId}`,
      { page, limit, sort },
    ],
    queryFn: () =>
      getProductsByCategoryWithPagination({
        page,
        limit,
        sort,
        categoryId: categoryId,
      }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
  });
};

export const useGetProductById = (options: ProductId & QueryKey) => {
  const { productId, queryKey } = options;
  return useQuery({
    queryKey: queryKey ?? [`product-${productId}`],
    queryFn: () => getProductById({ productId }),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
