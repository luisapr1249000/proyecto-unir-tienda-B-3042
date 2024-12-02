import { Category, CategoryId } from "./category";
import { Comment, CommentId } from "./comment";
import { Product, ProductId } from "./product";
import { UserId } from "./user";

export type PaginationConfig = {
  page?: number;
  limit?: number;
  sort?: string;
};

export type PaginationOptionsCategoryId = PaginationConfig & CategoryId;
export type PaginationOptionsCategoryName = PaginationConfig & {
  categoryName: string;
};

export type PaginationOptionsUserId = PaginationConfig & UserId;
export type PaginationOptionsProductId = PaginationConfig & ProductId;
export type PaginationOptionsCommentId = PaginationConfig & CommentId;
export type PaginationOptionsProductIdAndCommentId = PaginationConfig &
  CommentId &
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

export type PaginationResultComments = PaginationResult & {
  docs: Comment[];
};

export type PaginationResultUsers = PaginationResult & {
  docs: User[];
};

export type QueryKey = { queryKey: (string | boolean | number)[] };
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

export type PaginationOptionCommentIdAndQueryKey = PaginationOptionAndQueryKey &
  CommentId;
