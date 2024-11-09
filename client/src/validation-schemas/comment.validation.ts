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
  review: z.coerce.number().nonnegative().optional().default(1),
  image: z.array(imageSchema).optional().default([]),
});

export const commentSchema = abstractSchema
  .merge(commentInputSchema)
  .merge(authorFieldSchema)
  .merge(productFieldSchema);
