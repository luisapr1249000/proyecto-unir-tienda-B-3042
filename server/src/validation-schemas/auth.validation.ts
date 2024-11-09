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
