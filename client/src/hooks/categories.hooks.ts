import { useQuery, keepPreviousData } from "@tanstack/react-query";

import {
  getCategoriesWithPagination,
  getCategoryById,
  getCategoryByName,
} from "../api/category.api";
import { CategoryId, CategoryName } from "../types/category";
import { PaginatedQueryOptions } from "../types/query";

export const useGetCategoriesWithPagination_ = ({
  limit,
  page,
  sort,
  queryKey,
  enabled = true,
  isKeepPreviousData = false,
}: PaginatedQueryOptions) =>
  useQuery({
    queryKey: queryKey ?? ["categories", { page, limit, sort }],
    queryFn: () => getCategoriesWithPagination({ page, limit, sort }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    enabled: enabled,
  });

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
