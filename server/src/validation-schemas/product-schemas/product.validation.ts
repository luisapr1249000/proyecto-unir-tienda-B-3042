import { z } from "zod";

import { specificationsSchema } from "./productSpecifications.validation";
import { imageSchema } from "../image.schema";
import {
  abstractSchema,
  authorSchema,
  createPositiveIntegerField,
  createPositiveNumberField,
  createValidStringField,
  is_modifiedField,
  objectIdValidator,
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
const priceField = createPositiveNumberField({
  fieldName: "Price",
  multipleOf: 0.01,
});

const discountField = createPositiveNumberField({
  fieldName: "Discount",
  multipleOf: 0.01,
});

const finalPriceField = createPositiveNumberField({
  fieldName: "Final Price",
  multipleOf: 0.01,
});

export const productInputSchema = z.object({
  name: productNameField,
  description: productDescriptionField,
  categories: z
    .array(objectIdValidator("Category"))
    .refine((items) => new Set(items).size === items.length, {
      message: "All categories must be unique",
    }),
  price: priceField,
  quantity: quantityField,
  specifications: specificationsSchema,
  discount: discountField.optional(),
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
  finalPrice: finalPriceField,
  images: z.array(imageSchema),
});

export const productSchema = abstractSchema()
  .merge(productInputSchema)
  .merge(authorSchema())
  .merge(otherProps)
  .merge(is_modifiedField());
