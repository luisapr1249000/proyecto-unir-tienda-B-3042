import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getUserById,
  getUserByUsername,
  getUsersWithPagination,
} from "../api/users/user.api";
import { UserId } from "../types/user";
import {
  getUserAddressById,
  getUserAddresses,
  getUserDefaultAdressDirection,
} from "../api/users/address.api";
import {
  getUserCart,
  getUserWishlist,
} from "../api/users/userProductActions.api";
import {
  PaginatedQueryOptions,
  ReactQueryOptions,
  SearchQueryOptions,
} from "../types/query";

export const useGetUsersWithPagination_ = ({
  page,
  limit,
  sort,
  queryKey,
  isKeepPreviousData = false,
  enabled = true,
  query,
}: PaginatedQueryOptions & SearchQueryOptions) =>
  useQuery({
    queryKey: queryKey ?? ["users", { page, limit, sort, query }],
    queryFn: () => getUsersWithPagination({ page, limit, sort, query }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    enabled: enabled,
  });

export const useGetUserByUsername = ({
  username,
  queryKey,
  enabled = true,
}: { username: string } & ReactQueryOptions) =>
  useQuery({
    queryKey: queryKey ?? [`user-username-${username}`],
    queryFn: () => getUserByUsername(username),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
  });

export const useGetUserById = (options: UserId & ReactQueryOptions) => {
  const { userId, queryKey } = options;
  console.log("user id query key", userId);
  return useQuery({
    queryKey: queryKey ?? [`user-${userId}`],
    queryFn: () => getUserById(userId),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: options.enabled,
  });
};

export const useGetUserAddresses = ({
  userId,
  queryKey,
  enabled,
}: UserId & ReactQueryOptions) =>
  useQuery({
    queryKey: queryKey ?? [`user-${userId}-address-direction`],
    queryFn: () => getUserAddresses(userId),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
  });

export const useGetUserAddressById = ({
  userId,
  addressDirectionId,
  queryKey,
  enabled,
}: UserId & { addressDirectionId: string } & ReactQueryOptions) =>
  useQuery({
    queryKey: queryKey ?? [
      `user-${userId}-address-direction-${addressDirectionId}`,
    ],
    queryFn: () => getUserAddressById(userId, addressDirectionId),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
  });

export const useGetUserCart = ({
  userId,
  queryKey,
  enabled,
}: UserId & ReactQueryOptions) =>
  useQuery({
    queryKey: queryKey ?? [`user-${userId}-cart`],
    queryFn: () => getUserCart({ userId }),
    refetchOnWindowFocus: false,
    enabled: enabled,
    retry: false,
  });

export const useGetUserWishlist = ({
  userId,
  queryKey,
  enabled,
}: UserId & ReactQueryOptions) =>
  useQuery({
    queryKey: queryKey ?? [`user-${userId}-wishlist`],
    queryFn: () => getUserWishlist({ userId }),
    refetchOnWindowFocus: false,
    enabled: enabled,
  });

export const useGetUserDefaultAddressDirection = ({
  userId,
  queryKey,
  enabled,
}: UserId & ReactQueryOptions) =>
  useQuery({
    queryKey: queryKey ?? [`user-${userId}-default-address-direction`],
    queryFn: () => getUserDefaultAdressDirection(userId),
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
