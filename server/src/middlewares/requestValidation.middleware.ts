import { NextFunction, Request, Response } from "express";
import {
  handleBadRequest,
  handleNotPermissions,
  handleObjectNotFound,
} from "../utils/error.utils";
import {
  categoryNameSchema,
  usernameParamSchema,
} from "../validation-schemas/query.validation";
import { Product } from "../models/product.model";
import { objectIdValidator } from "../utils/zod.utils";
import { Order } from "../models/orders.model";
import { extractAuthUserId } from "../utils/auth.utils";
import Review from "../models/review.model";

export const validateSchemaBody = (schema: Zod.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return handleBadRequest(res, result.error);
    }
    next();
  };
};

export const validateObjectIdParams = (paramNames: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const paramName of paramNames) {
      const paramValue = req.params[paramName] ?? "";

      const result = objectIdValidator(paramValue).safeParse(paramValue);
      if (!result.success) {
        return handleBadRequest(res, result.error);
      }
    }
    next();
  };
};

export const validateObjectQueryParams = (schema: Zod.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, error } = schema.safeParse(req.query);
    if (!success) {
      return handleBadRequest(res, error);
    }
    next();
  };
};

export const validUsername = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = usernameParamSchema.safeParse(req.params);
  if (!result.success) {
    return handleBadRequest(res, result.error);
  }
  next();
};

export const checkProductExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return handleObjectNotFound(res, "Product");
  }
  next();
};

export const isSellerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) return handleNotPermissions(res);
  const authUserRole = req.user.role;
  const isSeller = req.user.isSeller;
  if (authUserRole !== "admin" && !isSeller) {
    return handleNotPermissions(res);
  }
  next();
};

export const validCategoryName = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = categoryNameSchema.safeParse(req.params);
  if (!result.success) {
    return handleBadRequest(res, result.error);
  }
  next();
};

export const verifyOrderOwnershipOrSellerRoleOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order) {
    return handleObjectNotFound(res, "Order");
  }
  const authUserId = req.user?._id.toString();
  const authUserRole = req.user?.role;
  if (authUserRole === "admin") {
    next();
  }
  if (authUserId === order.customer.toString() || authUserRole === "admin") {
    return next();
  }
  return handleNotPermissions(res);
};

export const checkIfhasAlreadyReviewed = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authUserId = extractAuthUserId(req);
  const { productId } = req.params;
  const hasAlreadyReviewed = await Review.findOne({
    product: productId,
    author: authUserId,
  });
  if (hasAlreadyReviewed)
    return res.status(400).json({ message: "Already reviewed" });
  next();
};
