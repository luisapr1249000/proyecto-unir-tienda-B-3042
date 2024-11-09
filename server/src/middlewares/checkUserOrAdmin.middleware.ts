import { Request, Response, NextFunction } from "express";
import { Comment } from "../models/comment.model";
import { Product } from "../models/product.model";
import { handleError, handleNotPermissions } from "../utils/error.utils";
import { User } from "../models/user.model";
import { Order } from "../models/orders.model";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authUserRole = req.user?.role;
  if (authUserRole !== "admin") {
    return handleNotPermissions(res);
  }
  next();
};

export const isUserOwnerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authUserId = req.user?._id?.toString();
  const authUserRole = req.user?.role;
  const { userId } = req.params;

  if (authUserId === userId || authUserRole === "admin") {
    return next();
  }

  return handleNotPermissions(res);
};

export const verifyUserOwnershipOrAdminRole = (resource: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUserId = req.user?._id;
      const authUserRole = req.user?.role;
      if (!authUserId || !authUserRole) {
        return handleNotPermissions(res);
      }
      const resourceId = req.params[resource];
      if (authUserRole === "admin") {
        next();
      }

      const resourceOwnerId = await getResourceOwnerId(
        resource,
        resourceId ?? "",
      );
      if (resourceOwnerId === authUserId) {
        next();
      }
      return handleNotPermissions(res);
    } catch (e) {
      return handleError(res, e);
    }
  };
};

const getResourceOwnerId = async (resource: string, resourceId: string) => {
  switch (resource) {
    case "userId": {
      const user = await User.findById(resourceId);
      return user?._id.toString();
    }

    case "commentId": {
      const comment = await Comment.findById(resourceId);
      return comment?.author;
    }

    case "productId": {
      const product = await Product.findById(resourceId);
      return product?.author;
    }

    case "orderId": {
      const order = await Order.findById(resourceId);
      return order?.customId;
    }
  }
};
