import { z } from "zod";
import {
  abstractSchema,
  authorFieldSchema,
  basicString,
} from "./abstract.validation";

export const categoryInputSchema = z.object({
  name: basicString,
  description: basicString.optional(),
});

export const categorySchema = abstractSchema
  .merge(categoryInputSchema)
  .merge(authorFieldSchema);
