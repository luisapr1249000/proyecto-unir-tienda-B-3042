import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getUserById,
  getUserByUsername,
  getUsersWithPagination,
} from "../api/user.api";
import { UserId } from "../types/user";
import {
  getUserCart,
  getUserSavedProducts,
  getUserWishlist,
} from "../api/userProductActions.api";
import { mergePaginationOptions } from "../utils/api.utils";
import { PaginationConfig } from "../types/paginationResult";

export const useGetUser = ({
  queryKey,
  isUsername = false,
  query,
}: {
  queryKey: string[];
  query: string;
  isUsername?: boolean;
}) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => (isUsername ? getUserByUsername(query) : getUserById(query)),
  });
};

export const useGetUserCart = ({ userId }: UserId) =>
  useQuery({
    queryKey: [`user-cart`, userId],
    queryFn: () => getUserCart({ userId }),
    refetchOnWindowFocus: false,
  });

export const useGetUserWishlist = ({ userId }: UserId) =>
  useQuery({
    queryKey: [`user-${userId}-wishlist`],
    queryFn: () => getUserWishlist({ userId }),
    refetchOnWindowFocus: false,
  });

export const useGetUserSavedProducts = ({ userId }: UserId) =>
  useQuery({
    queryKey: [`user-${userId}-saved-products`],
    queryFn: () => getUserSavedProducts({ userId }),
    refetchOnWindowFocus: false,
  });

export const userGetUsersWithPagination = (
  paginationOptions: PaginationConfig = {}
) => {
  const { limit, page, sort } = mergePaginationOptions(paginationOptions);
  return useQuery({
    queryKey: ["users", page, sort, limit],
    queryFn: () => getUsersWithPagination({ limit, page, sort }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};
