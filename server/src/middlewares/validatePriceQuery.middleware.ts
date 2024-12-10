import { Request, Response, NextFunction } from "express";
import { productPriceSortSchema } from "../validation-schemas/query.validation";

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
