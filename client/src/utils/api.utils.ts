import { PaginationConfig } from "../types/paginationResult";

const DEFAULT_PAGINATION_VALUES = {
  page: 1,
  limit: 10,
  sort: "-createdAt",
};

export const mergePaginationOptions = (
  paginationOptions: PaginationConfig
) => ({ ...DEFAULT_PAGINATION_VALUES, ...paginationOptions });
