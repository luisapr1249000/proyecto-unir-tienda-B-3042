import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getUserById,
  getUserByUsername,
  getUsersWithPagination,
} from "../api/users/user.api";
import { UserId } from "../types/user";
import { QueryKey } from "../types/paginationResult";
import { getUserAddressById, getUserAddresses } from "../api/users/address.api";
import {
  getUserCart,
  getUserWishlist,
} from "../api/users/userProductActions.api";
import { PaginatedQueryOptions } from "../types/query";

export const useGetUsersWithPagination_ = ({
  page,
  limit,
  sort,
  queryKey,
  isKeepPreviousData = false,
  enabled = true,
}: PaginatedQueryOptions) =>
  useQuery({
    queryKey: queryKey ?? ["users", { page, limit, sort }],
    queryFn: () => getUsersWithPagination({ page, limit, sort }),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    enabled: enabled,
  });

export const useGetUserByUsername = ({
  username,
  queryKey,
}: { username: string } & QueryKey) =>
  useQuery({
    queryKey: queryKey ?? [`user-username-${username}`],
    queryFn: () => getUserByUsername(username),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useGetUserById = (
  options: UserId & QueryKey & { enabled: boolean }
) => {
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

export const useGetUserAddresses = ({ userId, queryKey }: UserId & QueryKey) =>
  useQuery({
    queryKey: queryKey ?? [`user-${userId}-address-direction`],
    queryFn: () => getUserAddresses(userId),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useGetUserAddressById = ({
  userId,
  addressDirectionId,
  queryKey,
}: UserId & { addressDirectionId: string } & QueryKey) =>
  useQuery({
    queryKey: queryKey ?? [
      `user-${userId}-address-direction-${addressDirectionId}`,
    ],
    queryFn: () => getUserAddressById(userId, addressDirectionId),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useGetUserCart = ({
  userId,
  queryKey,
  enabled,
}: UserId & QueryKey & { enabled?: boolean }) =>
  useQuery({
    queryKey: queryKey ?? [`user-${userId}-cart`],
    queryFn: () => getUserCart({ userId }),
    refetchOnWindowFocus: false,
    enabled: enabled,
  });

export const useGetUserWishlist = ({
  userId,
  queryKey,
  enabled,
}: UserId & QueryKey & { enabled?: boolean }) =>
  useQuery({
    queryKey: queryKey ?? [`user-${userId}-wishlist`],
    queryFn: () => getUserWishlist({ userId }),
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
