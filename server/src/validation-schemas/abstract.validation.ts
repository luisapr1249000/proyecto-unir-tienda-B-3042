import { Types } from "mongoose";
import { z } from "zod";
import validator from "validator";

export const letterNumberDotWhitespaceRegex = /^[a-zA-Z0-9.\s]+$/;
export const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export const objectIdValidator = z
  .string()
  .min(1, { message: "Id required" })
  .refine((id) => Types.ObjectId.isValid(id), {
    message: "Invalid ObjectId format",
  });

export const mongooseObjectId = z.instanceof(Types.ObjectId);

export const abstractSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const authorObjIdSchema = z.object({
  author: objectIdValidator,
});
export const productObjIdSchema = z.object({
  product: objectIdValidator,
});

export const noSpacesAndOnlyDotSchema = z
  .string()
  .trim()
  .min(1, "The string cannot be empty")
  .regex(/^[a-zA-Z0-9.]+$/, "Only letters, numbers, and dots are allowed")
  .refine((str) => !str.includes(" "), {
    message: "No spaces are allowed",
  });

export const emailSchema = z.string().trim().email().min(1, "Email required");

export const descriptionSchema = z.string().trim().optional().default("");

export const baseStringSchema = z.string().trim().min(1);

export const phoneNumberSchema = z
  .string()
  .trim()
  .min(1)
  .refine(validator.isMobilePhone);
