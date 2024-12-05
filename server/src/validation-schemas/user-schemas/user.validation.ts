import { z } from "zod";
import {
  abstractSchema,
  createValidStringField,
  emailSchema,
  mongooseObjectId,
  noSpacesAndOnlyDotSchema,
  phoneNumberSchema,
} from "../abstract.validation";
import { imageSchema } from "../image.schema";

const firstNameField = createValidStringField({
  fieldName: "First Name",
}).optional();
const lastNameField = createValidStringField({
  fieldName: "Last Name",
}).optional();

const biographyField = createValidStringField({
  fieldName: "bio",
  maxLength: 500,
}).optional();

export const userInputSchema = z.object({
  username: noSpacesAndOnlyDotSchema,
  email: emailSchema,
  firstName: firstNameField,
  lastName: lastNameField,
  bio: biographyField,
  phoneNumber: phoneNumberSchema.optional(),
});

export const cartItem = z.object({
  quantity: z
    .number()
    .min(1, { message: "Quantity cannot be less than 1" })
    .default(1),
  productId: z
    .string()
    .refine((val) => val.length > 0, {
      message: "Product ID is required",
    })
    .optional(),
  price: z.number().optional(), // Optional price
  sellerId: mongooseObjectId,
});

export const userCartSchema = z.object({
  items: z.array(cartItem).default([]),
  totalPrice: z.number().default(0),
});

export const userSchema = userInputSchema.extend({
  isSeller: z.boolean(),
  role: z.enum(["user", "admin"]),
  lastLogin: z.date().optional(),
  savedProducts: z.array(mongooseObjectId).optional(),
  whislist: z.array(mongooseObjectId).optional(),
  hasConfirmedEmail: z.boolean().default(false),
  avatar: imageSchema,
  password: z.string().optional(),
  googleId: z.string().optional(),
});

export const userSchemaComplete = abstractSchema.merge(userSchema);
