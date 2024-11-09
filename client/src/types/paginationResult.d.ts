import { Category } from "./category";
import { Comment } from "./comment";
import { Product } from "./product";

export type PaginationConfig = {
  page?: number;
  limit?: number;
  sort?: string;
};

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

export type PaginationResultCategories = PaginationResult & {
  docs: Product[];
};

export type PaginationResultCategories = PaginationResult & {
  docs: Comment[];
};

export type PaginationResultCategories = PaginationResult & {
  docs: User[];
};
