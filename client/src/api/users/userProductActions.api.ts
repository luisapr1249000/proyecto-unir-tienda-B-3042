import { api } from "../../config/axios.config";
import { ProductId } from "../../types/product";
import { UserCart, UserId, UserWishlist } from "../../types/user";

export const getUserCart = async ({ userId }: UserId): Promise<UserCart> => {
  const response = await api<UserCart>(`/users/${userId}/cart/`);
  return response.data;
};

export const clearCart = async ({ userId }: UserId) => {
  const response = await api.delete(`/users/${userId}/clean-cart/`);
  return response.data;
};

export const toggleProductInCart = async ({
  productId,
  userId,
  quantity,
}: UserId & ProductId & { quantity: number }): Promise<UserCart> => {
  const response = await api.post<UserCart>(
    `/users/${userId}/cart/${productId}`,
    { quantity: quantity }
  );
  return response.data;
};

export const getUserWishlist = async ({
  userId,
}: UserId): Promise<UserWishlist> => {
  const response = await api<UserWishlist>(`/users/${userId}/wishlist/`);
  return response.data;
};

export const toggleProductInWishlist = async ({
  productId,
  userId,
}: UserId & ProductId): Promise<UserWishlist> => {
  const response = await api.post<UserWishlist>(
    `/users/${userId}/wishlist/${productId}`
  );
  return response.data;
};

export const clearWishlist = async ({ userId }: UserId) => {
  const response = await api.delete(`/users/${userId}/clean-wishlist/`);
  return response.data;
};
