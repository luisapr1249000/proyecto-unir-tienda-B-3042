import { Types } from "mongoose";
import Review from "../models/review.model";

export const getCommentCountFromProduct = (productId: string) =>
  Review.countDocuments({ product: productId });

export const createObjectId = (productId?: string) =>
  new Types.ObjectId(productId);

export const getTotalReviewsFromProduct = async (productId: string) => {
  const reviews = await Review.find({ productId });
  return reviews.map((review) => review.rating);
};

export const getAverageReview = async (productId: string) => {
  const totalReviews = await getTotalReviewsFromProduct(productId);
  if (totalReviews.length === 0) return 0;
  const total = totalReviews.reduce((accumulator, currentValue) => {
    return (accumulator ?? 0) + (currentValue ?? 0);
  }, 0);

  return (total ?? 0) / totalReviews.length;
};

interface Item {
  price?: number;
  quantity?: number;
}

export const calculateTotalPrice = (items: Item[]): number => {
  return items.reduce((total, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 0;
    return total + price * quantity;
  }, 0);
};

export const calculateSubtotal = (items: Item[]): number => {
  return items.reduce((total, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 0;
    return total + price * quantity;
  }, 0);
};
