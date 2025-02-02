import { api } from "../config/axios.config";
import {
  ReviewPaginationAndSortOptions,
  ReviewPaginationResults,
} from "../types/query";
import { ProductId } from "../types/product";
import { Review, ReviewId, ReviewInput } from "../types/review";

export const getReviews = async ({
  limit,
  page,
  sort,
  productId,
  userId,
}: ReviewPaginationAndSortOptions): Promise<ReviewPaginationResults> => {
  const hasProduct = productId ? `&productId=${productId}` : "";
  const hasUser = userId ? `&userId=${userId}` : "";
  const response = await api<ReviewPaginationResults>(
    `/reviews?page=${page}&limit=${limit}&sort=${sort}${hasProduct}${hasUser}`
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

export const createReview = async ({
  values,
  productId,
}: { values: ReviewInput } & ProductId): Promise<Review> => {
  const response = await api.post<Review>(
    `/products/${productId}/reviews/`,
    values
  );
  return response.data;
};

export const updateReview = async ({
  values,
  productId,
  reviewId,
}: {
  values: ReviewInput;
} & ProductId &
  ReviewId) => {
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
