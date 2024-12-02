import { PaginationConfig } from "../types/paginationResult";

const DEFAULT_PAGINATION_VALUES: PaginationConfig = {
  page: 1,
  limit: 10,
  sort: "-createdAt",
};

export const mergePaginationOptions = (
  paginationOptions: PaginationConfig
): PaginationConfig => ({ ...DEFAULT_PAGINATION_VALUES, ...paginationOptions });
