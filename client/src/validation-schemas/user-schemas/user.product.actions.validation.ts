import { z } from "zod";
import { productSchema } from "../product-schemas/product.validation";
import { abstractSchema } from "../abstract.validation";
import { userSchema } from "./user.validation";
import {
  createPositiveIntegerField,
  createPositiveNumberField,
} from "../../utils/zod.utils";

export const userCartArray = z.object({ cart: z.array(productSchema) });
export const userWishlistArray = z.object({ wishlist: z.array(productSchema) });

export const userWishlistSchema = abstractSchema()
  .omit({ updatedAt: true, createdAt: true })
  .merge(userWishlistArray);

const subtotalField = createPositiveNumberField({
  fieldName: "subtotal",
  multipleOf: 0.01,
});

const priceField = createPositiveNumberField({
  fieldName: "price",
  multipleOf: 0.01,
});

export const cartItem = z.object({
  product: productSchema,
  seller: userSchema,
  quantity: createPositiveIntegerField({ fieldName: "quantity" })
    .min(1, { message: "Quantity cannot be less than 1" })
    .default(1),
  price: priceField,
  subtotal: subtotalField,
});

export const userCartSchema = z.object({
  items: z.array(cartItem).default([]),
  totalPrice: z.number().positive().default(0),
  totalItems: z.number().positive().default(0),
});
