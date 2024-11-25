import { z } from "zod";
import {
  abstractSchema,
  authorFieldSchema,
  basicString,
} from "./abstract.validation";
import { imageSchema } from "./image.validation";
import { userSchema } from "./user.validation";
import { categorySchema } from "./category.validation";

export const specificationsSchema = z.object({
  dimensions: z
    .object({
      width: z.string().optional(),
      depth: z.string().optional(),
      height: z.string().optional(),
    })
    .optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  assemblyRequired: z.boolean().optional(),
  weightCapacity: z.number().optional(),
});

export const productInputSchema = z.object({
  name: basicString,
  description: z.string().min(1, "Description is required"),
  categories: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "All categories must be unique",
    }),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().nonnegative("Quantity must be non-negative"),
  images: z.array(imageSchema).default([]),
  specifications: specificationsSchema.optional(),
});

export const productCategory = z.object({
  categories: z.array(categorySchema),
});
export const productAuthor = z.object({ author: userSchema });

export const productSchema = abstractSchema
  .merge(productInputSchema.omit({ categories: true }))
  .merge(productCategory)
  .merge(productAuthor);

export const productQuantitySchema = (quantity: number) =>
  z.object({ quantity: z.number().min(1).max(quantity) });

export const userCartArray = z.object({ cart: z.array(productSchema) });
export const userWishlistArray = z.object({ wishlist: z.array(productSchema) });
export const userSavedProductsArray = z.object({
  savedProducts: z.array(productSchema),
});
export const userCartSchema = abstractSchema
  .omit({ updatedAt: true, createdAt: true })
  .merge(userCartArray);

export const userWishlistSchema = abstractSchema
  .omit({ updatedAt: true, createdAt: true })
  .merge(userWishlistArray);

export const userSavedProductsSchema = abstractSchema
  .omit({ updatedAt: true, createdAt: true })
  .merge(userSavedProductsArray);
