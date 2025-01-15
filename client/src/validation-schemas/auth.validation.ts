import { z } from "zod";
import { userSchema } from "./user-schemas/user.validation";
import {
  createBasicString,
  createEmailField,
  createPasswordSchema,
  createValidStringField,
  noWhiteSpaceField,
} from "../utils/zod.utils";

export const signupSchema = z
  .object({
    username: noWhiteSpaceField(),
    email: createEmailField(),
    password: createPasswordSchema(),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  rememberMe: z.coerce.boolean().optional(),
  loginValue: createValidStringField({
    fieldName: "Login value",
    maxLength: 100,
  }),
  password: z.string().min(1, "Password is required"),
});

export const emailSchema = z.object({ email: createEmailField() });

export const signupResponse = z.object({
  userSaved: userSchema,
  accessToken: createBasicString(),
});

export const loginResponse = z.object({ userId: createBasicString() });

export const changePasswordSchema = z
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
    }
  );

export const forgotPasswordSchema = z
  .object({
    newPassword: createPasswordSchema(),
    confirmPassword: z.string().min(1, "Confirmation password is required"),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

export const mailRequestSchema = z.object({
  email: createEmailField(),
});
