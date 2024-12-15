import { api } from "../config/axios.config";
import {
  PaginationConfig,
  PaginationOptionsProductId,
  PaginationOptionsUserId,
  PaginationResultReviews,
} from "../types/paginationResult";
import { ProductId } from "../types/product";
import { Review, ReviewId, ReviewInput } from "../types/review";

export const getReviews = async ({
  limit,
  page,
  sort,
}: PaginationConfig): Promise<PaginationResultReviews> => {
  const response = await api<PaginationResultReviews>(
    `/reviews?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getReviewsFromPostWithPagination = async ({
  productId,
  limit,
  page,
  sort,
}: PaginationOptionsProductId): Promise<PaginationResultReviews> => {
  const response = await api<PaginationResultReviews>(
    `/products/${productId}/reviews?page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getReviewsFromUserWithPagination = async ({
  userId,
  limit,
  page,
  sort,
}: PaginationOptionsUserId): Promise<PaginationResultReviews> => {
  const response = await api<PaginationResultReviews>(
    `/reviews/user/${userId}page=${page}&limit=${limit}&sort=${sort}`
  );
  return response.data;
};

export const getReviewById = async ({
  reviewId,
  productId,
}: ReviewId & ProductId): Promise<Review> => {
  const response = await api<Review>(
    `/products/${productId}/reviews/${reviewId}`
  );
  return response.data;
};

export const createReview = async (
  values: ReviewInput,
  productId: ProductId
): Promise<Review> => {
  const response = await api.post<Review>(
    `/products/${productId}/reviews/`,
    values
  );
  return response.data;
};

export const updateReview = async (
  values: ReviewInput,
  productId: ProductId,
  reviewId: ReviewId
): Promise<Review> => {
  const response = await api.put<Review>(
    `/products/${productId}/reviews/${reviewId}`,
    values
  );
  return response.data;
};

export const deleteReview = async ({
  reviewId,
  productId,
}: ProductId & ReviewId) => {
  await api.delete(`/products/${productId}/reviews/${reviewId}`);
};
