import { Category, CategoryId } from "./category";
import { Review, ReviewId } from "./review";
import { Product, ProductId } from "./product";
import { User, UserId } from "./user";
import { Report } from "./report";

export type PaginationConfig = {
  page?: number;
  limit?: number;
  sort?: string;
};

export type PaginationOptions = {
  page?: number;
  limit?: number;
  sort?: string;
};

export type PaginatedQueryOptions = PaginationOptions &
  QueryKey & {
    isKeepPreviousData?: boolean;
  };

export type PaginationOptionsCategoryId = PaginationConfig & CategoryId;
export type PaginationOptionsCategoryName = PaginationConfig & {
  categoryName: string;
};

export type PaginationOptionsUserId = PaginationConfig & UserId;
export type PaginationOptionsProductId = PaginationConfig & ProductId;
export type PaginationOptionsReviewId = PaginationConfig & ReviewId;
export type PaginationOptionsProductIdAndReviewId = PaginationConfig &
  ReviewId &
  ProductId;
export type PaginationResult = {
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

export type PaginationResultCategories = PaginationResult & {
  docs: Category[];
};

export type PaginationResultProducts = PaginationResult & {
  docs: Product[];
};

export type PaginationResultReviews = PaginationResult & {
  docs: Review[];
};

export type PaginationResultUsers = PaginationResult & {
  docs: User[];
};

export type PaginationResultReports = PaginationResult & {
  docs: Report[];
};

export type QueryKey = { queryKey?: (string | boolean | number)[] };
export type PaginationOptionAndQueryKey = PaginationConfig & QueryKey;
export type PaginationOptionUserIdAndQueryKey = PaginationOptionAndQueryKey &
  UserId;

export type EnabledQuery = { enabled: boolean };
export type PaginationOptionCategoryIdAndQueryKey =
  PaginationOptionAndQueryKey & CategoryId & EnabledQuery;

export type PaginationOptionCategoryNameAndQueryKey =
  PaginationOptionAndQueryKey & { categoryName: string };

export type PaginationOptionProductIddAndQueryKey =
  PaginationOptionAndQueryKey & ProductId;

export type PaginationOptionReviewIdAndQueryKey = PaginationOptionAndQueryKey &
  ReviewId;
