import { z } from "zod";

import { specificationsSchema } from "./productSpecifications.validation";
import { imageSchema } from "../image.schema";
import { userQuestionSchema } from "./product.user.question.validation";
import {
  abstractSchema,
  authorSchema,
  createMongooseObjectId,
  createPositiveIntegerField,
  createValidStringField,
} from "../../utils/zod.utils";

// -------------------------------------------------------
const productNameField = createValidStringField({
  fieldName: "Product Name",
  maxLength: 50,
});
const productDescriptionField = createValidStringField({
  fieldName: "Product Description",
  maxLength: 500,
});

const quantityField = createPositiveIntegerField({ fieldName: "Quantity" });

export const productInputSchema = z.object({
  name: productNameField,
  description: productDescriptionField,
  categories: z
    .array(createMongooseObjectId())
    .refine((items) => new Set(items).size === items.length, {
      message: "All categories must be unique",
    }),
  price: z.coerce
    .number()
    .nonnegative("The Price must be positive")
    .multipleOf(0.01),
  quantity: quantityField,
  images: z.array(imageSchema).default([]),
  specifications: specificationsSchema.default({}),
  discount: z.coerce.number().nonnegative().multipleOf(0.01).optional(),
});

const likesField = createPositiveIntegerField({ fieldName: "Likes" });
const dislikesField = createPositiveIntegerField({ fieldName: "Dislikes" });
const wishlistCountField = createPositiveIntegerField({
  fieldName: "Wishlist Count",
});
const reviewCountField = createPositiveIntegerField({
  fieldName: "review Count",
});
const averageReviewField = createPositiveIntegerField({
  fieldName: "Avaregate Review",
});
const viewCountField = createPositiveIntegerField({
  fieldName: "View Count",
});

export const otherProps = z.object({
  likes: likesField,
  dislikes: dislikesField,
  wishlistCount: wishlistCountField,
  reviewCount: reviewCountField,
  averageReview: averageReviewField,
  viewCount: viewCountField,
  userQuestions: z.array(userQuestionSchema),
  finalPrice: z.number().nonnegative().multipleOf(0.01),
});

export const productSchema = abstractSchema()
  .merge(productInputSchema)
  .merge(authorSchema())
  .merge(otherProps);

export const reactionSchema = z.object({
  interactionType: z.enum(["like", "dislike"]),
});
