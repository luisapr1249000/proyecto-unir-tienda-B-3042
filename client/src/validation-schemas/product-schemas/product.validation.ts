import { z } from "zod";
import { imageFileArraySchema, imageSchema } from "../image.validation";
import { userSchema } from "../user-schemas/user.validation";
import { categorySchema } from "../category.validation";
import { specificationsSchema } from "./productSpecifications.validation";
import {
  createBasicString,
  createPositiveIntegerField,
  createPositiveNumberField,
  createValidStringField,
  is_modifiedField,
} from "../../utils/zod.utils";
import { productQuestionSchema } from "./productQuestions.validation";
import { abstractSchema } from "../abstract.validation";

const wishlistCountField = createPositiveIntegerField({
  fieldName: "Wishlist Count",
});
const reviewCountField = createPositiveIntegerField({
  fieldName: "Review Count",
});
const averageReviewField = createPositiveNumberField({
  fieldName: "Avaregate Review",
});

const productNameField = createValidStringField({
  fieldName: "Product Name",
  maxLength: 50,
});
const productDescriptionField = createValidStringField({
  fieldName: "Product Description",
  maxLength: 500,
});

const quantityField = createPositiveIntegerField({ fieldName: "Quantity" });

const priceField = createPositiveNumberField({
  fieldName: "Price",
  multipleOf: 0.01,
});

export const productInputSchema = z.object({
  name: productNameField,
  description: productDescriptionField,
  categories: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "All categories must be unique",
    }),
  price: priceField,
  quantity: quantityField,
  specifications: specificationsSchema.optional(),
  discount: z.number().nonnegative().multipleOf(0.01).optional(),
  images: imageFileArraySchema.optional(),
});

export const otherProductProps = z.object({
  categories: z.array(categorySchema),
  author: userSchema,
  wishlistCount: wishlistCountField,
  reviewCount: reviewCountField,
  averageReview: averageReviewField,
  productQuestions: z.array(productQuestionSchema).optional(),
  images: z.array(imageSchema).default([]),
  finalPrice: z.coerce.number().nonnegative().multipleOf(0.01),
});

export const productSchema = abstractSchema()
  .merge(productInputSchema.omit({ categories: true }))
  .merge(is_modifiedField())
  .merge(otherProductProps);

export const productQuantitySchema = (quantity: number) =>
  z.object({ quantity: z.number().int().positive().min(1).max(quantity) });

export const productUserQuestionId = z.object({
  userQuestionId: createBasicString(),
});
