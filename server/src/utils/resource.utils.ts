import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { Order } from "../models/orders.model";
import Review from "../models/review.model";

export const getResourceOwnerId = async (
  resource: string,
  resourceId: string,
) => {
  switch (resource) {
    case "userId": {
      const user = await User.findById(resourceId);
      console.log(user?._id.toString());
      return user?._id.toString();
    }

    case "reviewId": {
      const review = await Review.findById(resourceId);
      return review?.author;
    }

    case "productId": {
      const product = await Product.findById(resourceId);
      return product?.author;
    }

    case "orderId": {
      const order = await Order.findById(resourceId);
      return order?.customer;
    }
  }
};
