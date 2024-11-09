import { z } from "zod";

export const usernameParamSchema = z.object({
  username: z.string().min(1),
});

export const sortSchema = z.coerce.string().min(1).default("-createdAt");

export const paginationCoerceSchema = z.object({
  page: z.coerce.number().nonnegative().min(1).default(1),
  limit: z.coerce.number().nonnegative().min(10).default(10),
  sort: sortSchema,
});

export const searchSchema = paginationCoerceSchema.extend({
  searchQuery: z.string().min(1, "Search required"),
  isPost: z.coerce.boolean().optional(),
  isComment: z.coerce.boolean().optional(),
});
