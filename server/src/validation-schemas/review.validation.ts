import { z } from "zod";
import { imageSchema } from "./image.schema";
import {
  abstractSchema,
  authorSchema,
  createPositiveIntegerField,
  createValidStringField,
  is_modifiedField,
  productObjIdSchema,
} from "../utils/zod.utils";

const reviewContentField = createValidStringField({
  fieldName: "content",
  maxLength: 200,
});

const reviewField = createPositiveIntegerField({
  fieldName: "review",
  maxValue: 5,
});

export const reviewInputSchema = z.object({
  content: reviewContentField,
  review: reviewField,
});

export const reviewOtherPropsSchema = z.object({
  images: z.array(imageSchema),
});

export const reviewSchema = abstractSchema()
  .merge(reviewInputSchema)
  .merge(reviewOtherPropsSchema)
  .merge(authorSchema())
  .merge(is_modifiedField())
  .merge(productObjIdSchema());
