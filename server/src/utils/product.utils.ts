import Reaction from "../models/reaction.model";
import ViewedProduct from "../models/viewedProduct.model";
import { Product } from "../types/product";

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
