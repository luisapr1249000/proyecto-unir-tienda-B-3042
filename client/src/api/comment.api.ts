import { api } from "../config/axios.config";
import { Comment, CommentId, CommentInput } from "../types/comment";
import {
  PaginationConfig,
  PaginationOptionsProductId,
  PaginationOptionsUserId,
  PaginationResultComments,
} from "../types/paginationResult";
import { ProductId } from "../types/product";

export const getComments = async ({
  limit,
  page,
  sort,
}: PaginationConfig): Promise<PaginationResultComments> => {
  const response = await api<PaginationResultComments>(
    `/comments?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getCommentsFromPost = async ({
  productId,
  limit,
  page,
  sort,
}: PaginationOptionsProductId): Promise<PaginationResultComments> => {
  const response = await api<PaginationResultComments>(
    `/products/${productId}/comments?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getCommentsFromUser = async ({
  userId,
  limit,
  page,
  sort,
}: PaginationOptionsUserId): Promise<PaginationResultComments> => {
  const response = await api<PaginationResultComments>(
    `/comments/user/${userId}page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getCommentById = async ({
  commentId,
  productId,
}: CommentId & ProductId): Promise<Comment> => {
  const response = await api<Comment>(
    `/products/${productId}/comments/${commentId}`
  );
  return response.data;
};

export const createComment = async (
  values: CommentInput,
  productId: ProductId
): Promise<Comment> => {
  const response = await api.post<Comment>(
    `/products/${productId}/comments/`,
    values
  );
  return response.data;
};

export const updateComment = async (
  values: CommentInput,
  productId: ProductId,
  commentId: CommentId
): Promise<Comment> => {
  const response = await api.put<Comment>(
    `/products/${productId}/comments/${commentId}`,
    values
  );
  return response.data;
};

export const deleteComment = async ({
  commentId,
  productId,
}: ProductId & CommentId) => {
  await api.delete(`/products/${productId}/comments/${commentId}`);
};
