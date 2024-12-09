import { z } from "zod";
import {
  abstractSchema,
  authorObjIdSchema,
  createNonNegativeNumberField,
  createValidStringField,
  productObjIdSchema,
} from "./abstract.validation";
import { imageSchema } from "./image.schema";

const reviewContentField = createValidStringField({
  fieldName: "content",
  maxLength: 200,
});

const reviewField = createNonNegativeNumberField({
  fieldName: "review",
  maxValue: 5,
});

export const reviewInputSchema = z.object({
  content: reviewContentField,
  review: reviewField,
  image: z.array(imageSchema).optional().default([]),
});

export const reviewSchema = abstractSchema
  .merge(reviewInputSchema)
  .merge(authorObjIdSchema)
  .merge(productObjIdSchema);
