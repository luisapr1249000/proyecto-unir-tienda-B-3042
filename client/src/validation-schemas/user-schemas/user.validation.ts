import { z } from "zod";
import { abstractSchema } from "../abstract.validation";
import { imageSchema } from "../image.validation";
import {
  createEmailField,
  createValidStringField,
  noWhiteSpaceField,
  phoneNumberField,
} from "../../utils/zod.utils";

const firstNameField = createValidStringField({
  fieldName: "First Name",
  maxLength: 50,
}).optional();
const lastNameField = createValidStringField({
  fieldName: "Last Name",
  maxLength: 50,
}).optional();

const biographyField = createValidStringField({
  fieldName: "bio",
  maxLength: 500,
}).optional();

export const userInputSchema = z.object({
  username: noWhiteSpaceField(),
  email: createEmailField(),
  firstName: firstNameField,
  lastName: lastNameField,
  bio: biographyField,
  mobilePhone: phoneNumberField().optional(),
  birthday: z.date().or(z.string()).nullish(),
});

export const userRole = z.enum(["user", "admin"]);

export const userInfo = z.object({
  isSeller: z.boolean(),
  role: userRole,
  lastLogin: z.date().optional(),
  whislist: z.array(z.string()).optional(),
  cart: z.array(z.string()).optional(),
  avatar: imageSchema.optional(),
  hasConfirmedEmail: z.boolean(),
  googleId: z.string().optional(),
});

export const userSchema = abstractSchema()
  .merge(userInputSchema)
  .merge(userInfo);
