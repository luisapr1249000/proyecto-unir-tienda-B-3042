import { z } from "zod";
import {
  addressDirection,
  addressDirectionInputSchema,
  userInputSchema,
  userSchema,
} from "../validation-schemas/user.validation";

export type User = z.infer<typeof userSchema>;
export type UserInput = z.infer<typeof userInputSchema>;
export type UserId = { userId: string };

export type AddressDirection = z.infer<typeof addressDirection>;
export type AddressDirectionInput = z.infer<typeof addressDirectionInputSchema>;
