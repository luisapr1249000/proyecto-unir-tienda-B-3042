import { z } from "zod";
import {
  abstractSchema,
  authorSchema,
  createNoWhitespaceString,
  createValidStringField,
} from "../utils/zod.utils";

const categoryDescriptionField = createValidStringField({
  fieldName: "Category Description",
  maxLength: 200,
});

export const categoryInputSchema = z.object({
  name: createNoWhitespaceString("Category Name", 50),
  description: categoryDescriptionField.optional(),
});

export const categorySchema = abstractSchema()
  .merge(categoryInputSchema)
  .merge(authorSchema());
