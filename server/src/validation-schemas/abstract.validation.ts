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

export const mongooseObjectId = z
  .instanceof(Types.ObjectId)
  .refine((id) => Types.ObjectId.isValid(id), {
    message: "Invalid ObjectId format",
  });

export const abstractSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const authorObjIdSchema = z.object({
  author: mongooseObjectId,
});
export const productObjIdSchema = z.object({
  product: mongooseObjectId,
});

export const noSpacesAndOnlyDotSchema = z
  .string()
  .trim()
  .min(1, "The string cannot be empty")
  .regex(/^[a-zA-Z0-9.]+$/, "Only letters, numbers, and dots are allowed")
  .refine((str) => !str.includes(" "), {
    message: "No spaces are allowed",
  });

export const emailSchema = z
  .string()
  .trim()
  .email()
  .min(1, "Email required")
  .max(100);

export const basicStringField = z.string().trim();

export const createValidStringField = ({
  fieldName,
  minLength = 1,
  maxLength = 25,
}: {
  fieldName: string;
  minLength?: number;
  maxLength?: number;
}) =>
  basicStringField
    .min(minLength, `${fieldName} required`)
    .max(
      maxLength,
      `${fieldName} must be no more than ${maxLength} characters`,
    );

export const phoneNumberSchema = z
  .string()
  .trim()
  .min(1)
  .refine(validator.isMobilePhone);

export const createNonNegativeNumberField = ({
  fieldName,
  maxValue,
}: {
  fieldName: string;
  maxValue?: number;
}) => {
  const schema = z.coerce
    .number()
    .int(`The ${fieldName} must be int`)
    .nonnegative(`The ${fieldName} must be non-negative`);

  if (maxValue) {
    schema.max(maxValue, `The ${fieldName} must not exceed ${maxValue}`);
  }

  return schema;
};
