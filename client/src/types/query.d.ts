import { QueryKey } from "@tanstack/react-query";
import { CategoryId } from "./category";
import { Report } from "./report";
import { User, UserId } from "./user";
import { ProductId } from "./product";
import { ReviewId } from "./review";

export type SearchProductsOptions = {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type ReactQueryOptions = {
  enabled?: boolean;
  queryKey?: (string | boolean | number)[];
  isKeepPreviousData?: boolean;
};

export type SearchQueryOptions = { query?: string };

export type ProductSearchOptions = SearchQueryOptions & {
  minPrice?: number;
  maxPrice?: number;
};

export type PaginationOptions = {
  page?: number;
  limit?: number;
  sort?: string;
};

export type PaginatedQueryOptions = PaginationOptions & ReactQueryOptions;

export type PaginatedQuerySearchOptions = PaginatedQueryOptions &
  SearchProductsOptions;

type BasicPaginationResults = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: null;
  offset: number;
  page: number;
  pagingCounter: number;
  prevPage: null;
  totalDocs: number;
  totalPages: number;
};

export type UserPaginationResults = BasicPaginationResults & {
  docs: User[];
};

export type CategoryPaginationResults = BasicPaginationResults & {
  docs: Category[];
};

export type ProductPaginationResults = BasicPaginationResults & {
  docs: Product[];
};

export type ReviewPaginationResults = BasicPaginationResults & {
  docs: Review[];
};

export type ReportPaginationResults = BasicPaginationResults & {
  docs: Report[];
};

export type AuthorQuery = { userId?: string };
export type CategoryQuery = { categoryId?: string };
export type ProductQuery = { productId?: string };
export type ReviewQuery = { reviewId?: string };

export type ProductPaginationAndSortOptions = PaginationOptions &
  ProductSearchOptions &
  CategoryQuery &
  AuthorQuery;

export type PaginationOptionsWithUserId = PaginationOptions & UserId;
export type PaginationOptionsWithProductId = PaginationOptions & ProductId;
export type PaginationOptionsWithReviewId = PaginationOptions & ReviewId;

export type ReviewPaginationAndSortOptions = PaginationOptions &
  ProductQuery &
  AuthorQuery;

export type PaginationModel = {
  pageSize: number;
  page: number;
};
