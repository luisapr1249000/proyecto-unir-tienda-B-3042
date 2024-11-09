import ViewedProduct from "../models/viewedProduct.model";

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
