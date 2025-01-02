import { z } from "zod";
import { imageSchema } from "../image.schema";
import {
  abstractSchema,
  createEmailField,
  createMongooseObjectId,
  createNoWhitespaceString,
  createPositiveIntegerField,
  createValidStringField,
  phoneNumberSchema,
} from "../../utils/zod.utils";

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
  username: createNoWhitespaceString("Username", 25),
  email: createEmailField(),
  firstName: firstNameField,
  lastName: lastNameField,
  bio: biographyField,
  phoneNumber: phoneNumberSchema().optional(),
});

export const cartItem = z.object({
  product: createMongooseObjectId(),
  seller: createMongooseObjectId(),
  quantity: createPositiveIntegerField({ fieldName: "quantity" })
    .min(1, { message: "Quantity cannot be less than 1" })
    .default(1),
  price: z.number().optional(),
});

export const userCartSchema = z.object({
  items: z.array(cartItem).default([]),
  totalPrice: z.number().positive().default(0),
  totalItems: z.number().positive().default(0),
});

export const userRoleField = z.enum(["user", "admin"]);

export const userSchema = userInputSchema.extend({
  isSeller: z.boolean(),
  role: userRoleField,
  lastLogin: z.date(),
  whislist: z.array(createMongooseObjectId()).optional(),
  hasConfirmedEmail: z.boolean().default(false),
  avatar: imageSchema,
  password: z.string().optional(),
  googleId: z.string().optional(),
});

export const userRoleSchema = userSchema.pick({ role: true });
export const userSchemaComplete = abstractSchema().merge(userSchema);
