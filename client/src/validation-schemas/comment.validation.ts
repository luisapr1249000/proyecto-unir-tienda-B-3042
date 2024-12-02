import { z } from "zod";
import {
  abstractSchema,
  authorFieldSchema,
  basicString,
  createNonNegativeNumberField,
  createValidStringField,
  productFieldSchema,
} from "./abstract.validation";
import { imageSchema } from "./image.validation";

const commentContentField = createValidStringField({
  fieldName: "content",
  maxLength: 200,
});

const reviewField = createNonNegativeNumberField({
  fieldName: "review",
  maxValue: 5,
});

export const commentInputSchema = z.object({
  content: commentContentField,
  review: reviewField,
  images: z
    .array(imageSchema.or(z.instanceof(File)))
    .optional()
    .default([]),
});

export const commentSchema = abstractSchema
  .merge(commentInputSchema)
  .merge(authorFieldSchema)
  .merge(productFieldSchema);
