import { Types } from "mongoose";
import Review from "../models/review.model";
import { UserCartItem } from "../types/user";

export const getCommentCountFromProduct = (productId: string) =>
  Review.countDocuments({ product: productId });

export const createObjectId = (productId?: string) =>
  new Types.ObjectId(productId);

export const getTotalReviewsFromProduct = async (productId: string) => {
  const reviews = await Review.find({ productId });
  return reviews.map((review) => review.review);
};

export const getAverageReview = async (productId: string) => {
  const totalReviews = await getTotalReviewsFromProduct(productId);
  const total = totalReviews.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return total / totalReviews.length;
};

export const fixedProductPrice = (price: number) => {
  price.toFixed(2);
};

export const calculateTotalPrice = (items: UserCartItem[]): number => {
  return items.reduce((total, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 0;
    return total + price * quantity;
  }, 0);
};

export const calculateSubtotal = (items: UserCartItem[]): number => {
  return items.reduce((total, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 0;
    return total + price * quantity;
  }, 0);
};
