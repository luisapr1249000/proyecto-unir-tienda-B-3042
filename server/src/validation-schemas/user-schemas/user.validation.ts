import { z } from "zod";
import {
  createEmailField,
  createNoWhitespaceString,
  createPositiveIntegerField,
  createValidStringField,
  phoneNumberSchema,
} from "../../utils/zod.utils";

const firstNameField = createValidStringField({
  fieldName: "First Name",
  maxLength: 40,
}).optional();
const lastNameField = createValidStringField({
  fieldName: "Last Name",
  maxLength: 40,
}).optional();

const biographyField = createValidStringField({
  fieldName: "bio",
  maxLength: 200,
}).optional();

export const userInputSchema = z.object({
  username: createNoWhitespaceString("Username", 30),
  email: createEmailField(),
  firstName: firstNameField,
  lastName: lastNameField,
  bio: biographyField,
  mobilePhone: phoneNumberSchema().optional(),
  birthday: z.date().optional(),
});

export const userRoleSchema = z.object({
  role: z.enum(["user", "admin"]),
});

const quantityField = createPositiveIntegerField({
  fieldName: "Quantity",
  minValue: 0,
});

export const cartItemSchema = z.object({
  quantity: quantityField,
});
