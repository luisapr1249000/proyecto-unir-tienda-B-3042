import { z } from "zod";
import {
  abstractSchema,
  authorFieldSchema,
  basicString,
  productFieldSchema,
} from "./abstract.validation";
import { imageSchema } from "./image.validation";

export const commentInputSchema = z.object({
  content: basicString,
  review: z.coerce.number().nonnegative().min(1).max(5).optional().default(1),
  images: z
    .array(imageSchema.or(z.instanceof(File)))
    .optional()
    .default([]),
});

export const commentSchema = abstractSchema
  .merge(commentInputSchema)
  .merge(authorFieldSchema)
  .merge(productFieldSchema);
