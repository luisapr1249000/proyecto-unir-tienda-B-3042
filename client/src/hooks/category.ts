import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryById,
  getCategoryByName,
} from "../api/category.api";
import { PaginationConfig } from "../types/paginationResult";
import { Category } from "../types/category";

export const useGetCategories = ({
  page,
  limit = 20,
  sort,
}: PaginationConfig) => {
  return useQuery({
    queryKey: ["categories", { page, limit, sort }],
    queryFn: () => getCategories({ page, limit, sort }),
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetCategoryById = ({ categoryId }: { categoryId: string }) => {
  return useQuery({
    queryKey: [`category ${categoryId}`],
    queryFn: () => getCategoryById({ categoryId }),
  });
};

export const useGetCategoryByName = ({
  categoryName,
}: {
  categoryName: string;
}) => {
  console.log(categoryName);
  return useQuery({
    queryKey: [`category ${categoryName}`],
    queryFn: async () => await getCategoryByName({ categoryName }),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
