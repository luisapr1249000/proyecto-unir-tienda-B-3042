import { z } from "zod";
import {
  abstractSchema,
  authorObjIdSchema,
  createValidStringField,
  noSpacesAndOnlyDotSchema,
} from "./abstract.validation";

const categoryDescriptionField = createValidStringField({
  fieldName: "Category Description",
  maxLength: 100,
});

export const categoryInputSchema = z.object({
  name: noSpacesAndOnlyDotSchema,
  description: categoryDescriptionField.optional(),
});

export const categorySchema = abstractSchema
  .merge(categoryInputSchema)
  .merge(authorObjIdSchema);
