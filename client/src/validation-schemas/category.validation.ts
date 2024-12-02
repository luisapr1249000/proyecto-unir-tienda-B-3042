import { z } from "zod";
import {
  abstractSchema,
  authorFieldSchema,
  basicString,
  createValidStringField,
} from "./abstract.validation";

const categoryDescriptionField = createValidStringField({
  fieldName: "Category Description",
  maxLength: 100,
});
export const categoryInputSchema = z.object({
  name: basicString,
  description: categoryDescriptionField.optional(),
});

export const categorySchema = abstractSchema
  .merge(categoryInputSchema)
  .merge(authorFieldSchema);
