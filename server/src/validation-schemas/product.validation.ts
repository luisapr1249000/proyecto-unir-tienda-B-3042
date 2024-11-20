import { z } from "zod";
import {
  abstractSchema,
  authorObjIdSchema,
  baseStringSchema,
  mongooseObjectId,
} from "./abstract.validation";
export const imageSchema = z.object({
  originalName: z.string(),
  url: z.string().url("Invalid image URL"),
  contentType: z.string(),
  size: z.number().nonnegative("Size must be a non-negative number"),
});

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
  name: baseStringSchema,
  description: z.string().min(1, "Description is required"),
  categories: z
    .array(mongooseObjectId)
    .refine((items) => new Set(items).size === items.length, {
      message: "All categories must be unique",
    }),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().nonnegative("Quantity must be non-negative"),
  images: z.array(imageSchema).default([]),
  specifications: specificationsSchema.optional(),
});

export const viewCount = z.object({ viewCount: z.number().default(0) });
export const otherProps = z.object({
  likes: z.number().default(0),
  dislikes: z.number().default(0),
  wishlistCount: z.number().default(0),
});

export const productSchema = abstractSchema
  .merge(productInputSchema)
  .merge(authorObjIdSchema)
  .merge(otherProps)
  .merge(viewCount);

export const reactionSchema = z.object({
  interactionType: z.enum(["like", "dislike"]),
});
