import { z } from "zod";
import {
  abstractSchema,
  basicString,
  createValidStringField,
  emailString,
} from "../abstract.validation";
import { imageSchema } from "../image.validation";

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
  username: basicString,
  email: emailString,
  firstName: firstNameField,
  lastName: lastNameField,
  bio: biographyField,
  phoneNumber: basicString.optional(),
});

export const userInfo = z.object({
  isSeller: z.boolean(),
  role: z.enum(["user", "admin"]),
  lastLogin: z.date().optional(),
  savedProducts: z.array(z.string()).optional(),
  whislist: z.array(z.string()).optional(),
  cart: z.array(z.string()).optional(),
  avatar: imageSchema.optional(),
  hasConfirmedEmail: z.boolean(),
});
export const userSchema = abstractSchema.merge(userInputSchema).merge(userInfo);
