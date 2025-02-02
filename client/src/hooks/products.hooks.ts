import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getProductById,
  getProductsWithPagination,
} from "../api/products/products.api";
import { ProductId } from "../types/product";
import {
  ProductPaginationAndSortOptions,
  ReactQueryOptions,
} from "../types/query";

export const useGetProductsWithPagination = ({
  limit = 10,
  page = 1,
  sort = "-createdAt",
  minPrice = 1,
  maxPrice = Infinity,
  isKeepPreviousData = false,
  enabled = true,
  categoryId,
  query,
  queryKey,
  userId,
}: ProductPaginationAndSortOptions & ReactQueryOptions) =>
  useQuery({
    queryKey: queryKey ?? [
      "products",
      { page, limit, sort, minPrice, maxPrice, categoryId, userId, query },
    ],
    queryFn: () =>
      getProductsWithPagination({
        page,
        limit,
        sort,
        minPrice,
        maxPrice,
        categoryId,
        userId,
        query,
      }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    enabled: enabled,
    staleTime: Infinity,
  });

export const useGetProductById = ({
  productId,
  queryKey,
  enabled = true,
}: ProductId & ReactQueryOptions) => {
  return useQuery({
    queryKey: queryKey ?? [`product-${productId}`],
    queryFn: () => getProductById({ productId }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
};
