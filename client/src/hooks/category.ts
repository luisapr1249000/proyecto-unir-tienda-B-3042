import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/category.api";
import { PaginationConfig } from "../types/paginationResult";

export const useGetCategories = ({
  page,
  limit = 20,
  sort,
}: PaginationConfig) => {
  return useQuery({
    queryKey: ["categories", { page, limit, sort }],
    queryFn: () => getCategories({ page, limit, sort }),
  });
};
