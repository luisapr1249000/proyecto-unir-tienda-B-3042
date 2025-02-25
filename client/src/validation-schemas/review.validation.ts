import { z } from "zod";
import { abstractSchema } from "./abstract.validation";
import { imageFileArraySchema, imageSchema } from "./image.validation";
import {
  createPositiveIntegerField,
  createValidStringField,
  is_modifiedField,
} from "../utils/zod.utils";
import { userSchema } from "./user-schemas/user.validation";
import { productSchema } from "./product-schemas/product.validation";

const reviewContentField = createValidStringField({
  fieldName: "content",
  maxLength: 200,
});

const reviewField = createPositiveIntegerField({
  fieldName: "review",
  maxValue: 5,
});

export const reviewTitleField = createValidStringField({
  fieldName: "title",
  maxLength: 50,
});

export const reviewInputSchema = z.object({
  title: reviewTitleField,
  content: reviewContentField,
  rating: reviewField,
  images: imageFileArraySchema.optional(),
});

export const reviewProps = z.object({
  author: userSchema,
  images: z.array(imageSchema),
  product: productSchema,
});
export const reviewSchema = abstractSchema()
  .merge(reviewInputSchema)
  .merge(is_modifiedField())
  .merge(reviewProps);
