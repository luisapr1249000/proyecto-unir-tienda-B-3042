import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryById,
  getCategoryByName,
} from "../api/category.api";
import { PaginationConfig } from "../types/paginationResult";
import { Category } from "../types/category";
import { mergePaginationOptions } from "../utils/api.utils";

export const useGetCategoriesWitPagination = (
  paginationOptions: PaginationConfig = {}
) => {
  const { limit, page, sort } = mergePaginationOptions(paginationOptions);
  return useQuery({
    queryKey: ["categories", { page, limit, sort }],
    queryFn: () => getCategories({ page, limit, sort }),
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetCategoryById = ({ categoryId }: { categoryId: string }) =>
  useQuery({
    queryKey: [`category ${categoryId}`],
    queryFn: () => getCategoryById({ categoryId }),
  });

export const useGetCategoryByName = ({
  categoryName,
}: {
  categoryName: string;
}) =>
  useQuery({
    queryKey: [`category ${categoryName}`],
    queryFn: () => getCategoryByName({ categoryName }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!Boolean(categoryName),
  });
