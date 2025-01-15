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
  phoneNumber: phoneNumberField().optional(),
});

export const userInfo = z.object({
  isSeller: z.boolean(),
  role: z.enum(["user", "admin"]),
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
