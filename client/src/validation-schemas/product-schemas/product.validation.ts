import { z } from "zod";
import { imageSchema } from "../image.validation";
import { userSchema } from "../user-schemas/user.validation";
import { categorySchema } from "../category.validation";
import { userQuestionSchema } from "./product.user.question.validation";
import {
  basicStringField,
  createIntField,
  createNonNegativeNumberField,
  createPositiveNumberField,
  createValidStringField,
} from "../../utils/zod.utils";
import { abstractSchema } from "../abstract.validation";
import { specificationsSchema } from "./productSpecifications.validation";

const likesField = createNonNegativeNumberField({ fieldName: "Likes" });
const dislikesField = createNonNegativeNumberField({ fieldName: "Dislikes" });
const wishlistCountField = createNonNegativeNumberField({
  fieldName: "Wishlist Count",
});
const commentCountField = createNonNegativeNumberField({
  fieldName: "Review Count",
});
const averageReviewField = createNonNegativeNumberField({
  fieldName: "Avaregate Review",
});
const viewCountField = createNonNegativeNumberField({
  fieldName: "View Count",
});

const productNameField = createValidStringField({
  fieldName: "Product Name",
  maxLength: 50,
});
const productDescriptionField = createValidStringField({
  fieldName: "Product Description",
  maxLength: 500,
});

const quantityField = createIntField({ fieldName: "Quantity" });

const priceField = createPositiveNumberField({ fieldName: "Price" });

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
});

export const otherProductProps = z.object({
  categories: z.array(categorySchema),
  author: userSchema,
  likes: likesField,
  dislikes: dislikesField,
  wishlistCount: wishlistCountField,
  commentCount: commentCountField,
  averageReview: averageReviewField,
  viewCount: viewCountField,
  userQuestions: z.array(userQuestionSchema).optional(),
  images: z.array(imageSchema).default([]),
  finalPrice: z.coerce.number().nonnegative().multipleOf(0.01),
});

export const productSchema = abstractSchema
  .merge(productInputSchema.omit({ categories: true }))
  .merge(otherProductProps);

export const productQuantitySchema = (quantity: number) =>
  z.object({ quantity: z.number().int().positive().min(1).max(quantity) });

export const productUserQuestionId = z.object({
  userQuestionId: basicStringField,
});
