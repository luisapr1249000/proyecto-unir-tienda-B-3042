import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { PaginationConfig } from "../types/paginationResult";
import {
  getReviewById,
  getReviews,
  getReviewsFromPostWithPagination,
  getReviewsFromUserWithPagination,
} from "../api/review.api";
import { ReviewId } from "../types/review";
import { ProductId } from "../types/product";
import { mergePaginationOptions } from "../utils/api.utils";

export const useGetReviewsWithPagination = (
  paginationOption: PaginationConfig = {}
) => {
  const { limit, page, sort } = mergePaginationOptions(paginationOption);

  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviews({ limit, page, sort }),
    placeholderData: keepPreviousData,
  });
};

export const useGetReviewsFromProductWithPagination = (
  { productId }: ProductId,
  paginationOption: PaginationConfig = {}
) => {
  const { limit, page, sort } = mergePaginationOptions(paginationOption);

  const queryKeyValue = ["product-reviews", productId, limit, page, sort];
  return useQuery({
    queryKey: queryKeyValue,
    queryFn: () =>
      getReviewsFromPostWithPagination({ productId, limit, page, sort }),
    placeholderData: keepPreviousData,
  });
};

export const useGetReviewsFromUserWithPagination = (
  { userId }: UserId,
  paginationOption: PaginationConfig = {}
) => {
  const { limit, page, sort } = mergePaginationOptions(paginationOption);

  const queryKeyValue = ["user-reviews", userId, limit, page, sort];
  return useQuery({
    queryKey: queryKeyValue,
    queryFn: () =>
      getReviewsFromUserWithPagination({ userId, limit, page, sort }),
    placeholderData: keepPreviousData,
  });
};

export const useGetReviewById = ({
  reviewId,
  productId,
}: ReviewId & ProductId) => {
  return useQuery({
    queryKey: [`review-${reviewId}`],
    queryFn: () => getReviewById({ reviewId, productId }),
  });
};
