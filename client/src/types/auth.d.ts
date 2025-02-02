import { z } from "zod";
import {
  changePasswordSchema,
  emailSchema,
  forgotPasswordSchema,
  loginResponse,
  loginSchema,
  mailRequestSchema,
  resetPasswordSchema,
  signupResponse,
  signupSchema,
} from "../validation-schemas/auth.validation";
import { userSchema } from "../validation-schemas/user-schemas/user.validation";

export type AuthSignup = z.infer<typeof signupSchema>;
export type AuthLogin = z.infer<typeof loginSchema>;

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type MailRequest = z.infer<typeof mailRequestSchema>;

export type SignupResponse = z.infer<typeof userSchema>;
export type LoginResponse = z.infer<typeof loginResponse>;
