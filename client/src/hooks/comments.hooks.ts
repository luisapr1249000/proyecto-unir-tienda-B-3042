import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  PaginationConfig,
  PaginationOptionsProductId,
  PaginationOptionsUserId,
} from "../types/paginationResult";
import {
  getCommentById,
  getComments,
  getCommentsFromPost,
  getCommentsFromUser,
} from "../api/comment.api";
import { CommentId } from "../types/comment";
import { ProductId } from "../types/product";
import { mergePaginationOptions } from "../utils/api.utils";

export const useInfiniteGetCommentsFromPost = (
  { productId }: ProductId,
  paginationOption: PaginationConfig = {}
) => {
  const { limit, page, sort } = mergePaginationOptions(paginationOption);
  const queryKeyValue = ["product-infinite-comments", limit, page, sort];
  return useInfiniteQuery({
    queryKey: queryKeyValue,
    queryFn: ({ pageParam }) =>
      getCommentsFromPost({ productId, limit, sort, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });
};

export const useGetCommentFromPostWithPagination = (
  { productId }: ProductId,
  paginationOption: PaginationConfig = {}
) => {
  const { limit, page, sort } = mergePaginationOptions(paginationOption);
  const queryKeyValue = ["post-comments", productId, limit, page, sort];
  return useQuery({
    queryKey: queryKeyValue,
    queryFn: () => getCommentsFromPost({ productId, limit, page, sort }),
  });
};
export const useGetCommentFromPost = ({
  productId,
  limit,
  page,
  sort,
}: PaginationOptionsProductId) =>
  useQuery({
    queryKey: [`post-${productId}-comments`],
    queryFn: () => getCommentsFromPost({ productId, limit, page, sort }),
  });

export const useGetCommentFromUser = ({
  userId,
  limit,
  page,
  sort,
}: PaginationOptionsUserId) =>
  useQuery({
    queryKey: [`user-${userId}-comments`],
    queryFn: () => getCommentsFromUser({ userId, limit, page, sort }),
  });

export const useGetComments = ({ limit, page, sort }: PaginationConfig) =>
  useQuery({
    queryKey: [`comments`],
    queryFn: () => getComments({ limit, page, sort }),
  });

export const useGetCommentById = ({
  commentId,
  productId,
}: CommentId & ProductId) =>
  useQuery({
    queryKey: [`comment-${commentId}`],
    queryFn: () => getCommentById({ commentId, productId }),
  });
