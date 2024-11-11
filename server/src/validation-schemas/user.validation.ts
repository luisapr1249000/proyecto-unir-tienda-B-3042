import { z } from "zod";
import {
  abstractSchema,
  authorObjIdSchema,
  baseStringSchema,
  emailSchema,
  mongooseObjectId,
  noSpacesAndOnlyDotSchema,
  phoneNumberSchema,
} from "./abstract.validation";
import { imageSchema } from "./product.validation";

export const addressDirectionInputSchema = z.object({
  mobileNumber: phoneNumberSchema.optional(),
  pinCode: baseStringSchema,
  locality: baseStringSchema,
  addressLine1: baseStringSchema,
  addressLine2: baseStringSchema.optional(),
  cityDistrictTown: baseStringSchema,
  state: baseStringSchema,
  landmark: baseStringSchema,
  alternatePhone: baseStringSchema.optional(),
  addressType: z.enum(["home", "work"]),
});

export const addressDirectionSchema = abstractSchema
  .merge(addressDirectionInputSchema)
  .merge(authorObjIdSchema);

export const userInputSchema = z.object({
  username: noSpacesAndOnlyDotSchema,
  email: emailSchema,
  firstName: baseStringSchema.optional(),
  lastName: baseStringSchema.optional(),
  bio: baseStringSchema.optional(),
  phoneNumber: phoneNumberSchema.optional(),
});

export const userSchema = userInputSchema.extend({
  isSeller: z.boolean(),
  role: z.enum(["user", "admin"]),
  lastLogin: z.date().optional(),
  savedProducts: z.array(mongooseObjectId).optional(),
  whislist: z.array(mongooseObjectId).optional(),
  cart: z.array(mongooseObjectId).optional(),
  avatar: imageSchema,
});

export const userSchemaComplete = abstractSchema.merge(userSchema);
