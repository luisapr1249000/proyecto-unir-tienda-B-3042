import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { PaginatedQueryOptions } from "../types/paginationResult";
import {
  getCategoriesWithPagination,
  getCategoryById,
  getCategoryByName,
} from "../api/category.api";
import { mergePaginationOptions } from "../utils/api.utils";
import { CategoryId, CategoryName } from "../types/category";

export const useGetCategoriesWithPagination = (
  options: PaginatedQueryOptions = {}
) => {
  const { limit, page, sort, queryKey, isKeepPreviousData } = {
    ...mergePaginationOptions(options),
    ...options,
  };
  return useQuery({
    queryKey: queryKey ?? ["categories", { page, limit, sort }],
    queryFn: () => getCategoriesWithPagination({ page, limit, sort }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
  });
};

export const useGetCategoryById = ({ categoryId }: CategoryId) =>
  useQuery({
    queryKey: [`category`, categoryId],
    queryFn: () => getCategoryById({ categoryId }),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

export const useGetCategoryByName = ({ categoryName }: CategoryName) =>
  useQuery({
    queryKey: [`category ${categoryName}`],
    queryFn: () => getCategoryByName({ categoryName }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!Boolean(categoryName),
    staleTime: Infinity,
  });
