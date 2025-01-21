import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  PaginatedQueryOptions,
  QueryKey,
  SearchProductsOptions,
} from "../types/paginationResult";
import { mergePaginationOptions } from "../utils/api.utils";
import {
  getProductById,
  getProductsByCategoryWithPagination,
  getProductstByAuthorWithPagination,
  getProductsWithPagination,
  searchProductsWithPagination,
} from "../api/products/products.api";
import { UserId } from "../types/user";
import { CategoryId } from "../types/category";
import { ProductId } from "../types/product";
import {
  PaginatedQueryOptions as p,
  PaginatedQuerySearchOptions,
} from "../types/query";

export const useGetProductsWithPagination_ = ({
  queryKey,
  limit = 10,
  page = 1,
  sort = "-createdAt",
  minPrice = 1,
  maxPrice = Infinity,
  isKeepPreviousData = false,
  enabled = true,
}: PaginatedQuerySearchOptions) =>
  useQuery({
    queryKey: queryKey ?? [
      "products",
      { page, limit, sort, minPrice, maxPrice },
    ],
    queryFn: () =>
      getProductsWithPagination({ page, limit, sort, minPrice, maxPrice }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    enabled: enabled,
  });

export const useGetProductsByAuthorWithPagination_ = ({
  userId,
  queryKey,
  limit = 10,
  page = 1,
  sort = "-createdAt",
  isKeepPreviousData = false,
  enabled = true,
  minPrice = 1,
  maxPrice = Infinity,
}: PaginatedQuerySearchOptions & UserId) =>
  useQuery({
    queryKey: queryKey ?? [
      "products",
      { page, limit, sort, minPrice, maxPrice },
    ],
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
    enabled: enabled,
  });

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
  options: PaginatedQueryOptions &
    CategoryId & { minPrice?: number; maxPrice?: number; enabled?: boolean } = {
    categoryId: "",
    minPrice: 1,
    maxPrice: Infinity,
  }
) => {
  const {
    limit,
    page,
    sort,
    queryKey,
    isKeepPreviousData,
    categoryId,
    minPrice,
    maxPrice,
    enabled,
  } = {
    ...mergePaginationOptions(options),
    ...options,
  };
  return useQuery({
    queryKey: queryKey ?? [
      `products-category-${categoryId}`,
      { page, limit, sort, minPrice, maxPrice },
    ],
    queryFn: () =>
      getProductsByCategoryWithPagination({
        page,
        limit,
        sort,
        categoryId: categoryId,
        minPrice,
        maxPrice,
      }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    enabled: enabled,
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

export const useSearchProducts = ({
  query,
  minPrice = 0,
  maxPrice = Infinity,
  page = 1,
  limit = 10,
  sort = "-createdAt",
  queryKey,
  isKeepPreviousData = false,
}: SearchProductsOptions & PaginatedQueryOptions) => {
  return useQuery({
    queryKey: queryKey ?? ["products", { page, limit, sort, query }],
    queryFn: () =>
      searchProductsWithPagination({
        maxPrice,
        minPrice,
        query,
        limit,
        page,
        sort,
      }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
  });
};
