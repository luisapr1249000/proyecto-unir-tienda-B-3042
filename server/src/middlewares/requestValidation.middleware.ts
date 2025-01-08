import { NextFunction, Request, Response } from "express";
import {
  handleBadRequest,
  handleNotPermissions,
  handleObjectNotFound,
} from "../utils/error.utils";
import {
  categoryName as categoryNameSchema,
  paginationCoerceSchema,
  productPriceSortSchema,
  usernameParamSchema,
} from "../validation-schemas/query.validation";
import { Product } from "../models/product.model";
import { objectIdValidator } from "../utils/zod.utils";
import { userRoleSchema } from "../validation-schemas/user-schemas/user.validation";
import { getDefaultPaginationOptions } from "../utils/utils";

export const validRole = (req: Request, res: Response, next: NextFunction) => {
  const { success, error } = userRoleSchema.safeParse(req.body);
  if (!success) {
    return handleBadRequest(res, error);
  }
  next();
};

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

export const validPagination = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const defaultPagination = { ...getDefaultPaginationOptions(), ...req.query };
  const paginationResult = paginationCoerceSchema.safeParse(defaultPagination);
  if (!paginationResult.success) {
    return handleBadRequest(res, paginationResult.error);
  }
  next();
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

export const validatePriceQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { minPrice, maxPrice } = req.query;
  const { success } = productPriceSortSchema.safeParse({ minPrice, maxPrice });
  if (!success) return res.status(400).json({ messge: "Bad Request" });
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
  const { categoryName } = req.params;
  const result = categoryNameSchema.safeParse(categoryName);
  if (!result.success) {
    return handleBadRequest(res, result.error);
  }
  next();
};
