import { useQuery } from "@tanstack/react-query";
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
