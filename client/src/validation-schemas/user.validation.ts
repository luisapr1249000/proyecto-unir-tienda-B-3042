import { z } from "zod";
import {
  abstractSchema,
  basicString,
  emailString,
} from "./abstract.validation";
import { imageSchema } from "./image.validation";
import { productSchema } from "./product.validation";

export const addressDirectionInputSchema = z.object({
  phoneNumber: basicString.optional(),
  pinCode: basicString,
  locality: basicString,
  addressLine1: basicString,
  addressLine2: basicString.optional(),
  cityDistrictTown: basicString,
  state: basicString,
  landmark: basicString,
  alternatePhone: basicString.optional(),
  addressType: z.enum(["home", "work"]),
});

export const addressDirection = abstractSchema.merge(
  addressDirectionInputSchema
);

export const userInputSchema = z.object({
  username: basicString,
  email: emailString,
  firstName: basicString.optional(),
  lastName: basicString.optional(),
  bio: basicString.optional(),
  phoneNumber: basicString.optional(),
});

export const userInfo = z.object({
  isSeller: z.boolean(),
  role: z.enum(["user", "admin"]),
  lastLogin: z.date().optional(),
  savedProducts: z.array(z.string()).optional(),
  whislist: z.array(z.string()).optional(),
  cart: z.array(z.string()).optional(),
  avatar: imageSchema.optional(),
});
export const userSchema = abstractSchema.merge(userInputSchema).merge(userInfo);
