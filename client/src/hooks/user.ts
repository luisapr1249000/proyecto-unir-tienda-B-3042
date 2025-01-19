import { useQuery } from "@tanstack/react-query";
import {
  getUserById,
  getUserByUsername,
  getUsersWithPagination,
} from "../api/users/user.api";
import { UserId } from "../types/user";
import { PaginatedQueryOptions, QueryKey } from "../types/paginationResult";
import { mergePaginationOptions } from "../utils/api.utils";
import { getUserAddressById, getUserAddresses } from "../api/users/address.api";
import {
  getUserCart,
  getUserWishlist,
} from "../api/users/userProductActions.api";

export const useGetUsersWithPagination = (
  options: PaginatedQueryOptions = {}
) => {
  const { limit, page, sort, queryKey } = {
    ...options,
    ...mergePaginationOptions(options),
  };
  return useQuery({
    queryKey: queryKey ?? ["users", page, sort, limit],
    queryFn: () => getUsersWithPagination({ limit, page, sort }),
    refetchOnWindowFocus: false,
  });
};

export const useGetUserByUsername = (
  options: { username: string } & QueryKey
) => {
  const { username, queryKey } = options;
  return useQuery({
    queryKey: queryKey ?? [`user-username-${username}`],
    queryFn: () => getUserByUsername(username),
    retry: false,
    refetchOnWindowFocus: false,
  });
};

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

// export const useGetUser = ({
//   queryKey,
//   isUsername = false,
//   query,
// }: {
//   queryKey: string[];
//   query: string;
//   isUsername?: boolean;
// }) => {
//   return useQuery({
//     queryKey: queryKey,
//     queryFn: () => (isUsername ? getUserByUsername(query) : getUserById(query)),
//   });
// };

// export const useGetUserCart = ({ userId }: UserId) =>
//   useQuery({
//     queryKey: [`user-cart`, userId],
//     queryFn: () => getUserCart({ userId }),
//     refetchOnWindowFocus: false,
//   });

// export const useGetUserWishlist = ({ userId }: UserId) =>
//   useQuery({
//     queryKey: [`user-${userId}-wishlist`],
//     queryFn: () => getUserWishlist({ userId }),
//     refetchOnWindowFocus: false,
//   });

// export const useGetUserSavedProducts = ({ userId }: UserId) =>
//   useQuery({
//     queryKey: [`user-${userId}-saved-products`],
//     queryFn: () => getUserSavedProducts({ userId }),
//     refetchOnWindowFocus: false,
//   });
