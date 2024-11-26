import { Types } from "mongoose";
import Reaction from "../models/reaction.model";
import ViewedProduct from "../models/viewedProduct.model";
import { Comment } from "../models/comment.model";
import { Response } from "express";

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
  Comment.countDocuments({ product: productId });

export const createObjectId = (productId?: string) =>
  new Types.ObjectId(productId);

export const checkIfModelSaved = <T>(object: T, res: Response) => {
  if (!object) {
    return res.status(400).json({ message: "Something went Bad" });
  }
};

export const getTotalProductCommentReviews = async (productId: string) => {
  const comments = await Comment.find({ productId });
  return comments.map((comment) => comment.review);
};

export const getAverageReview = async (productId: string) => {
  const totalReviews = await getTotalProductCommentReviews(productId);
  const total = totalReviews.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return total / totalReviews.length;
};
