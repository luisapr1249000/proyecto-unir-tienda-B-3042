import { z } from "zod";
import {
  abstractSchema,
  authorObjIdSchema,
  createNonNegativeNumberField,
  createValidStringField,
  objectIdValidator,
} from "../abstract.validation";
import { specificationsSchema } from "./productSpecifications.validation";
import { imageSchema } from "../image.schema";
import { userQuestionSchema } from "./product.user.question.validation";

// -------------------------------------------------------
const productNameField = createValidStringField({
  fieldName: "Product Name",
  maxLength: 50,
});
const productDescriptionField = createValidStringField({
  fieldName: "Product Description",
  maxLength: 500,
});

const quantityField = createNonNegativeNumberField({ fieldName: "Quantity" });

export const productInputSchema = z.object({
  name: productNameField,
  description: productDescriptionField,
  categories: z
    .array(objectIdValidator)
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

const likesField = createNonNegativeNumberField({ fieldName: "Likes" });
const dislikesField = createNonNegativeNumberField({ fieldName: "Dislikes" });
const wishlistCountField = createNonNegativeNumberField({
  fieldName: "Wishlist Count",
});
const commentCountField = createNonNegativeNumberField({
  fieldName: "Comment Count",
});
const averageReviewField = createNonNegativeNumberField({
  fieldName: "Avaregate Review",
});
const viewCountField = createNonNegativeNumberField({
  fieldName: "View Count",
});

export const otherProps = z.object({
  likes: likesField,
  dislikes: dislikesField,
  wishlistCount: wishlistCountField,
  commentCount: commentCountField,
  averageReview: averageReviewField,
  viewCount: viewCountField,
  userQuestions: z.array(userQuestionSchema),
  finalPrice: z.number().nonnegative().multipleOf(0.01),
});

export const productSchema = abstractSchema
  .merge(productInputSchema)
  .merge(authorObjIdSchema)
  .merge(otherProps);

export const reactionSchema = z.object({
  interactionType: z.enum(["like", "dislike"]),
});
