import { z } from "zod";
import {
  loginSchema,
  signupSchema,
} from "../validation-schemas/auth.validation";

export type AuthSignup = z.infer<typeof signupSchema>;
export type AuthLogin = z.infer<typeof loginSchema>;
