import { z } from "zod";
import { imageSchema } from "./product.validation";
import {
  abstractSchema,
  authorObjIdSchema,
  baseStringSchema,
  productObjIdSchema,
} from "./abstract.validation";

export const commentInputSchema = z.object({
  content: baseStringSchema,
  review: z.coerce.number().nonnegative().optional().default(1),
  image: z.array(imageSchema).optional().default([]),
});

export const commentSchema = abstractSchema
  .merge(commentInputSchema)
  .merge(authorObjIdSchema)
  .merge(productObjIdSchema);
