import { z } from "zod";
import {
  createPositiveIntegerField,
  createPostiveNumberField,
  createValidStringField,
} from "../utils/zod.utils";

export const usernameParamSchema = z.object({
  username: z.string().min(1),
});

export const sortSchema = createValidStringField({
  fieldName: "sort",
  maxLength: 30,
});

const pageField = createPositiveIntegerField({ fieldName: "page" });
const limitField = createPositiveIntegerField({
  fieldName: "limit",
  minValue: 10,
});

export const paginationCoerceSchema = z.object({
  page: pageField,
  limit: limitField,
  sort: sortSchema,
});

const minPriceField = createPostiveNumberField({
  fieldName: "minPrice",
  multipleOf: 0.01,
});
export const productPriceSortSchema = z
  .object({
    minPrice: minPriceField.optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
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
