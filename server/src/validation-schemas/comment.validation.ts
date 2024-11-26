import { z } from "zod";
import {
  abstractSchema,
  authorObjIdSchema,
  createNonNegativeNumberField,
  createValidStringField,
  productObjIdSchema,
} from "./abstract.validation";
import { imageSchema } from "./image.schema";

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
  image: z.array(imageSchema).optional().default([]),
});

export const commentSchema = abstractSchema
  .merge(commentInputSchema)
  .merge(authorObjIdSchema)
  .merge(productObjIdSchema);
