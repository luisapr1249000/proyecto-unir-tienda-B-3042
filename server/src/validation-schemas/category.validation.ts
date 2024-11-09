import { z } from "zod";
import {
  abstractSchema,
  authorObjIdSchema,
  baseStringSchema,
  noSpacesAndOnlyDotSchema,
} from "./abstract.validation";

export const categoryInputSchema = z.object({
  name: noSpacesAndOnlyDotSchema,
  description: baseStringSchema.optional(),
});

export const categorySchema = abstractSchema
  .merge(categoryInputSchema)
  .merge(authorObjIdSchema);
