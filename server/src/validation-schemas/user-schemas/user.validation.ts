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

export const userSchema = userInputSchema.extend({
  isSeller: z.boolean(),
  role: z.enum(["user", "admin"]),
  lastLogin: z.date().optional(),
  savedProducts: z.array(mongooseObjectId).optional(),
  whislist: z.array(mongooseObjectId).optional(),
  cart: z.array(mongooseObjectId).optional(),
  hasConfirmedEmail: z.boolean().default(false),
  avatar: imageSchema,
  password: z.string(),
});

export const userSchemaComplete = abstractSchema.merge(userSchema);
