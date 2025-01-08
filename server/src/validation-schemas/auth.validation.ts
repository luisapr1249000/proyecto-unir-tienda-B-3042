import { z } from "zod";
import {
  createBasicString,
  createEmailField,
  createNoWhitespaceString,
  createPasswordSchema,
  createValidStringField,
} from "../utils/zod.utils";

export const signupSchema = z
  .object({
    username: createNoWhitespaceString("Username", 25),
    email: createEmailField(),
    password: createPasswordSchema(),
    confirmPassword: z.string().min(1, "Confirmation password is required"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  rememberMe: z.coerce.boolean().optional(),
  loginValue: createValidStringField({
    fieldName: "Login value",
    maxLength: 100,
  }),
  password: z.string().min(1, "Password is required"),
});

export const jwtSchema = z.object({
  sub: z.string().min(1),
  username: z.string().min(1),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: createBasicString().min(1, "Current password is required"),
    newPassword: createPasswordSchema(),
    confirmPassword: z.string().min(1, "Confirmation password is required"),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    },
  );
