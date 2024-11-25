import { z } from "zod";
import {
  emailSchema,
  loginResponse,
  loginSchema,
  resetPasswordSchema,
  signupResponse,
  signupSchema,
} from "../validation-schemas/auth.validation";

export type AuthSignup = z.infer<typeof signupSchema>;
export type AuthLogin = z.infer<typeof loginSchema>;

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
export type ConfirmationEmail = z.infer<typeof emailSchema>;

export type SignupResponse = z.infer<typeof signupResponse>;
export type LoginResponse = z.infer<typeof loginResponse>;
