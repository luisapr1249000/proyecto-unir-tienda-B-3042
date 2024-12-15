import { z } from "zod";
import { userSchema } from "./user-schemas/user.validation";
import {
  basicStringField,
  emailStringField,
  noSpacesField,
  passwordStringField,
} from "../utils/zod.utils";

export const signupSchema = z
  .object({
    username: noSpacesField.max(30, "Max 30 characters"),
    email: emailStringField,
    password: passwordStringField,
    confirmPassword: passwordStringField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  rememberMe: z.boolean().default(false),
  loginValue: basicStringField,
  password: basicStringField,
});

export const resetPasswordSchema = z
  .object({
    password: passwordStringField,
    confirmPassword: passwordStringField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"],
  });

export const emailSchema = z.object({ email: emailStringField });

export const signupResponse = z.object({
  userSaved: userSchema,
  accessToken: basicStringField,
});

export const loginResponse = z.object({ userId: basicStringField });
