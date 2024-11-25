import { api } from "../config/axios.config";
import { ProductId } from "../types/product";
import {
  User,
  UserCart,
  UserId,
  UserSavedProducts,
  UserWishlist,
} from "../types/user";

export const addProductToCart = async ({
  userId,
  productId,
}: ProductId & UserId): Promise<UserCart> => {
  const response = await api.post<UserCart>(
    `/users/${userId}/cart/${productId}`,
    {}
  );
  return response.data;
};

export const addProductToWishlist = async ({
  userId,
  productId,
}: ProductId & UserId): Promise<UserCart> => {
  const response = await api.post<UserCart>(
    `/users/${userId}/wishlist/${productId}`,
    {}
  );
  return response.data;
};

export const addProductToSavedProducts = async ({
  userId,
  productId,
}: ProductId & UserId): Promise<UserCart> => {
  const response = await api.post<UserCart>(
    `/users/${userId}/saved-products/${productId}`,
    {}
  );
  return response.data;
};

export const RemoveProductToCart = async ({
  userId,
  productId,
}: ProductId & UserId): Promise<void> => {
  await api.delete(`/users/${userId}/cart/${productId}`);
};

export const RemoveProductToWishlist = async ({
  userId,
  productId,
}: ProductId & UserId) => {
  await api.delete(`/users/${userId}/wishlist/${productId}`);
};

export const RemoveProductToSavedProducts = async ({
  userId,
  productId,
}: ProductId & UserId): Promise<void> => {
  await api.delete(`/users/${userId}/saved-products/${productId}`);
};

export const getUserCart = async ({ userId }: UserId): Promise<UserCart> => {
  const response = await api<UserCart>(`/users/${userId}/cart/`);
  return response.data;
};

export const getUserWishlist = async ({
  userId,
}: UserId): Promise<UserWishlist> => {
  const response = await api<UserWishlist>(`/users/${userId}/wishlist/`);
  return response.data;
};

export const getUserSavedProducts = async ({
  userId,
}: UserId): Promise<UserSavedProducts> => {
  const response = await api<UserSavedProducts>(
    `/users/${userId}/saved-products/`
  );
  return response.data;
};
