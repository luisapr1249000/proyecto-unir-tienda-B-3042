import { z } from "zod";
import {
  abstractSchema,
  authorObjIdSchema,
  createNonNegativeNumberField,
  createValidStringField,
  mongooseObjectId,
} from "../abstract.validation";
import { specificationsSchema } from "./productSpecifications.validation";
import { imageSchema } from "../image.schema";

const productNameField = createValidStringField({
  fieldName: "Product Name",
  maxLength: 50,
});
const productDescriptionField = createValidStringField({
  fieldName: "Product Description",
  maxLength: 500,
});

const priceField = createNonNegativeNumberField({ fieldName: "Price" });
const quantityField = createNonNegativeNumberField({ fieldName: "Quantity" });

export const productInputSchema = z.object({
  name: productNameField,
  description: productDescriptionField,
  categories: z
    .array(mongooseObjectId)
    .refine((items) => new Set(items).size === items.length, {
      message: "All categories must be unique",
    }),
  price: priceField,
  quantity: quantityField,
  images: z.array(imageSchema).default([]),
  specifications: specificationsSchema.optional(),
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
});

export const productSchema = abstractSchema
  .merge(productInputSchema)
  .merge(authorObjIdSchema)
  .merge(otherProps);

export const reactionSchema = z.object({
  interactionType: z.enum(["like", "dislike"]),
});

const userQuestionInputField = createValidStringField({
  fieldName: "User Question Content",
  maxLength: 150,
});
const userQuestionInputAnswerField = createValidStringField({
  fieldName: "User Question Answer",
  maxLength: 150,
});

export const userQuestionInput = z.object({ content: userQuestionInputField });
export const userQuestionInputAnswer = z.object({
  answer: userQuestionInputAnswerField,
});
export const userQuestionOtherValues = z.object({
  user: mongooseObjectId,
  isAnswered: z.boolean().default(false),
});

export const userQuestionSchema = abstractSchema
  .merge(userQuestionInput)
  .merge(userQuestionInputAnswer)
  .merge(userQuestionOtherValues);
