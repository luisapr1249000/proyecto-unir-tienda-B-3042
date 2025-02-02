import { z } from "zod";
import {
  createPositiveIntegerField,
  createPositiveNumberField,
  createValidStringField,
  objectIdValidator,
} from "../utils/zod.utils";

const usernameField = createValidStringField({
  fieldName: "username",
  maxLength: 50,
});

export const usernameParamSchema = z.object({
  username: usernameField,
});

export const categoryName = createValidStringField({
  fieldName: "categoryName",
  maxLength: 50,
});

export const categoryNameSchema = z.object({
  categoryName: categoryName,
});

export const sortSchema = createValidStringField({
  fieldName: "sort",
  maxLength: 30,
});

const pageField = createPositiveIntegerField({
  fieldName: "page",
  minValue: 0,
});
const limitField = createPositiveIntegerField({
  fieldName: "limit",
  minValue: 5,
});

export const paginationCoerceSchema = z.object({
  page: pageField.optional(),
  limit: limitField.optional(),
  sort: sortSchema.optional(),
});

const minPriceField = createPositiveNumberField({
  fieldName: "minPrice",
  multipleOf: 0.01,
});

const searchQueryField = createValidStringField({
  fieldName: "searchQuery",
  maxLength: 50,
});

export const userPaginationAndSort = paginationCoerceSchema.extend({
  searchQuery: searchQueryField.optional(),
  isSeller: z.coerce.boolean().optional(),
});

export const productPaginationAndSortSchema = paginationCoerceSchema
  .extend({
    categoryId: objectIdValidator().optional(),
    authorId: objectIdValidator().optional(),
    minPrice: minPriceField.optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
    searchQuery: searchQueryField.optional(),
  })
  .refine(
    (data) => {
      return data.minPrice && data.maxPrice
        ? data.minPrice <= data.maxPrice
        : true;
    },
    {
      message: "minPrice must be less than or equal to maxPrice",
      path: ["minPrice"],
    },
  );

export const reviewPaginationAndSortSchema = paginationCoerceSchema.extend({
  authorId: objectIdValidator().optional(),
  productId: objectIdValidator().optional(),
  searchQuery: searchQueryField.optional(),
});

export const reportPaginationAndSortSchema = paginationCoerceSchema.extend({
  reportedItem: objectIdValidator().optional(),
  reporter: objectIdValidator().optional(),
  itemType: z.enum(["Product", "Review", "User", "Category"]).optional(),
  reason: z
    .enum(["Spam", "Inappropriate Content", "Misleading Information"])
    .optional(),
});
