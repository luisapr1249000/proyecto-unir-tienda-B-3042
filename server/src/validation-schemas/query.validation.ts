import { z } from "zod";
import { createPositiveIntegerField } from "../utils/zod.utils";

export const usernameParamSchema = z.object({
  username: z.string().min(1),
});

export const sortSchema = z.coerce.string().min(1).default("-createdAt");

const pageField = createPositiveIntegerField({ fieldName: "page" });
const limitField = createPositiveIntegerField({ fieldName: "limit" });

export const paginationCoerceSchema = z.object({
  page: pageField.min(1).default(1),
  limit: limitField.min(10).default(10),
  sort: sortSchema,
});

export const searchSchema = paginationCoerceSchema.extend({
  searchQuery: z.string().min(1, "Search required"),
  isPost: z.coerce.boolean().optional(),
  isComment: z.coerce.boolean().optional(),
});

export const productPriceSortSchema = z
  .object({
    minPrice: z.coerce.number().min(1).default(1),
    maxPrice: z.coerce.number().nonnegative().default(Infinity),
  })
  .refine((data) => data.minPrice <= data.maxPrice, {
    message: "minPrice must be less than or equal to maxPrice",
    path: ["minPrice"],
  });
