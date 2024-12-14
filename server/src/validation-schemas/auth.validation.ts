import { z } from "zod";
import { emailSchema, noSpacesAndOnlyDotSchema } from "./abstract.validation";

const passwordValidaton = z.string().min(8, "Password required");

export const signupSchema = z.object({
  username: noSpacesAndOnlyDotSchema,
  email: emailSchema,
  password: passwordValidaton,
});

export const loginSchema = z.object({
  rememberMe: z.coerce.boolean().optional(),
  loginValue: noSpacesAndOnlyDotSchema,
  password: passwordValidaton,
});

export const jwtSchema = z.object({
  sub: z.string().min(1),
  username: z.string().min(1),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    // .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    // .regex(/[0-9]/, "Password must include at least one number"),
    confirmPassword: z.string().min(1, "Confirmation password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"], // This specifies the field that will receive the error
    message: "Passwords must match",
  });
