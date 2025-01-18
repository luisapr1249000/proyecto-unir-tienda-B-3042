import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  PaginatedQueryOptions,
  PaginationConfig,
} from "../types/paginationResult";
import {
  getReviewById,
  getReviews,
  getReviewsFromPostWithPagination,
  getReviewsFromUserWithPagination,
} from "../api/review.api";
import { ReviewId } from "../types/review";
import { ProductId } from "../types/product";
import { mergePaginationOptions } from "../utils/api.utils";
import { UserId } from "../types/user";

export const useGetReviewsWithPagination = ({
  queryKey,
  isKeepPreviousData,
  ...sorting
}: PaginatedQueryOptions = {}) => {
  const { limit, page, sort } = mergePaginationOptions(sorting);

  return useQuery({
    queryKey: queryKey ?? ["reviews", limit, page, sort],
    queryFn: () => getReviews({ limit, page, sort }),
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    refetchOnWindowFocus: false,
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
    refetchOnWindowFocus: false,
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
    refetchOnWindowFocus: false,
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
