import { z } from "zod";
import { basicStringField, createValidStringField } from "../utils/zod.utils";
import { abstractSchema } from "./abstract.validation";
import { userSchema } from "./user-schemas/user.validation";

const nameField = createValidStringField({
  fieldName: "Category Name",
  maxLength: 50,
});

const categoryDescriptionField = createValidStringField({
  fieldName: "Category Description",
  maxLength: 200,
});
export const categoryInputSchema = z.object({
  name: nameField,
  description: categoryDescriptionField.optional(),
});

console.log(1);
export const categoryProps = z.object({ author: userSchema });

export const categorySchema = abstractSchema
  .merge(categoryInputSchema)
  .merge(categoryProps);
