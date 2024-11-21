import { z } from "zod";
import {
  AlphanumericAndDotsRegex,
  basicString,
  emailString,
} from "./abstract.validation";

const passwordSchema = z.string().min(1);

export const signupSchema = z
  .object({
    username: basicString.regex(AlphanumericAndDotsRegex),
    email: emailString,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  rememberMe: z.boolean().default(false),
  loginValue: basicString,
  password: passwordSchema,
});

export const resetPasswordSchema = z.object({ newPassword: basicString });
export const emailSchema = z.object({ email: emailString });
