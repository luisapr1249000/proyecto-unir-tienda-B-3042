import { useQuery } from "@tanstack/react-query";
import { getUserById, getUserByUsername } from "../api/user.api";
import { UserId } from "../types/user";
import {
  getUserCart,
  getUserSavedProducts,
  getUserWishlist,
} from "../api/userProductActions.api";

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
    queryKey: [`user-${userId}-cart`],
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
