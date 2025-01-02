import { z } from "zod";

import { specificationsSchema } from "./productSpecifications.validation";
import { imageSchema } from "../image.schema";
import { userQuestionSchema } from "./product.user.question.validation";
import {
  abstractSchema,
  authorSchema,
  createMongooseObjectId,
  createPositiveIntegerField,
  createPostiveNumberField,
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
const priceField = createPostiveNumberField({
  fieldName: "Price",
  multipleOf: 0.01,
});

const discountField = createPostiveNumberField({
  fieldName: "Discount",
  multipleOf: 0.01,
});

const finalPriceField = createPostiveNumberField({
  fieldName: "Final Price",
  multipleOf: 0.01,
});

export const productInputSchema = z.object({
  name: productNameField,
  description: productDescriptionField,
  categories: z
    .array(createMongooseObjectId())
    .refine((items) => new Set(items).size === items.length, {
      message: "All categories must be unique",
    }),
  price: priceField,
  quantity: quantityField,
  images: z.array(imageSchema),
  specifications: specificationsSchema,
  discount: discountField,
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
  finalPrice: finalPriceField,
});

export const productSchema = abstractSchema()
  .merge(productInputSchema)
  .merge(authorSchema())
  .merge(otherProps);
