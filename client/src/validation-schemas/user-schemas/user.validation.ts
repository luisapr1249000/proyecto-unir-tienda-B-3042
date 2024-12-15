import { z } from "zod";
import { abstractSchema } from "../abstract.validation";
import { imageSchema } from "../image.validation";
import {
  basicStringField,
  createValidStringField,
  emailStringField,
  noSpacesField,
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
  username: noSpacesField,
  email: emailStringField,
  firstName: firstNameField,
  lastName: lastNameField,
  bio: biographyField,
  phoneNumber: basicStringField.optional(),
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

console.log(11);
export const userSchema = abstractSchema.merge(userInputSchema).merge(userInfo);

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[0-9]/, "Password must include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });
