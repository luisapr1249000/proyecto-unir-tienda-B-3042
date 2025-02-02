import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getReviewById, getReviews } from "../api/review.api";
import { ReviewId } from "../types/review";
import { ProductId } from "../types/product";
import {
  ReactQueryOptions,
  ReviewPaginationAndSortOptions,
} from "../types/query";

export const useGetReviewsWithPagination = ({
  page = 1,
  limit = 10,
  sort = "-createdAt",
  queryKey,
  enabled = true,
  isKeepPreviousData = false,
  productId,
  userId,
}: ReviewPaginationAndSortOptions & ReactQueryOptions) => {
  return useQuery({
    queryKey: queryKey ?? ["reviews", { page, limit, sort, productId, userId }],
    queryFn: () => getReviews({ limit, page, sort, productId, userId }),
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    refetchOnWindowFocus: false,
    enabled: enabled,
    retry: false,
  });
};

export const useGetReviewById = ({
  reviewId,
  productId,
  enabled = true,
  queryKey,
}: ReviewId & ProductId & ReactQueryOptions) => {
  return useQuery({
    queryKey: queryKey ?? [`review-${reviewId}`],
    queryFn: () => getReviewById({ reviewId, productId }),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};
