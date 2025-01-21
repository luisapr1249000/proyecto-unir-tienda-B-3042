import { PaginationOptions, SearchProductsOptions } from "./paginationResult";

export type ReactQueryOptions = {
  enabled?: boolean;
  queryKey?: (string | boolean | number)[];
  isKeepPreviousData?: boolean;
};

export type PaginatedQueryOptions = PaginationOptions & ReactQueryOptions;

export type PaginatedQuerySearchOptions = PaginatedQueryOptions &
  SearchProductsOptions;
