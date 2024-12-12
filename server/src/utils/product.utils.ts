import { Types } from "mongoose";
import Reaction from "../models/reaction.model";
import ViewedProduct from "../models/viewedProduct.model";
import Review from "../models/review.model";

export const hasNotViewedRecently = async (
  userId: string,
  productId: string,
) => {
  const oneHourAgo = new Date(Date.now() - 10 * 60 * 1000);
  const recentViewed = await ViewedProduct.findOne({
    userId,
    productId,
    timestamp: { $gte: oneHourAgo },
  });
  return !recentViewed;
};

export const hasReacted = async (productId: string, userId: string) => {
  const hasReacted = await Reaction.findOne({ productId, userId });
  return {
    hasReacted: hasReacted ? true : false,
    reactStatus: hasReacted ? hasReacted.type : null,
  };
};

export const getCommentCountFromProduct = (productId: string) =>
  Review.countDocuments({ product: productId });

export const createObjectId = (productId?: string) =>
  new Types.ObjectId(productId);

export const getTotalProductCommentReviews = async (productId: string) => {
  const reviews = await Review.find({ productId });
  return reviews.map((comment) => comment.review);
};

export const getAverageReview = async (productId: string) => {
  const totalReviews = await getTotalProductCommentReviews(productId);
  const total = totalReviews.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return total / totalReviews.length;
};

export const fixedProductPrice = (price: number) => {
  price.toFixed(2);
};
