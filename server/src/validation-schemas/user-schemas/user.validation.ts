import { z } from "zod";
import {
  abstractSchema,
  createValidStringField,
  emailSchema,
  objectIdValidator,
  noSpacesAndOnlyDotSchema,
  phoneNumberSchema,
  mongooseObjectId,
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
  productId: mongooseObjectId,
  price: z.number().optional(), // Optional price
  sellerId: mongooseObjectId,
});

export const userCartSchema = z.object({
  items: z.array(cartItem).default([]),
  totalPrice: z.number().default(0),
});

export const userRoleSchema = z.enum(["user", "admin"]);

export const userSchema = userInputSchema.extend({
  isSeller: z.boolean(),
  role: userRoleSchema,
  lastLogin: z.date().optional(),
  savedProducts: z.array(objectIdValidator).optional(),
  whislist: z.array(objectIdValidator).optional(),
  hasConfirmedEmail: z.boolean().default(false),
  avatar: imageSchema,
  password: z.string().optional(),
  googleId: z.string().optional(),
});

export const userSchemaComplete = abstractSchema.merge(userSchema);
