import { z } from "zod";

export const abstractSchema = z.object({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const basicString = z.string().trim().min(1);
export const emailString = z.string().trim().email().min(1).toLowerCase();
export const authorFieldSchema = z.object({
  author: z.string().trim().min(24),
});
export const productFieldSchema = z.object({
  product: z.string().trim().min(24),
});
export const categoryFieldSchema = z.object({
  product: z.string().trim().min(24),
});
export const AlphanumericAndDotsRegex = /^[a-zA-Z0-9.]+$/;

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
      `${fieldName} must be no more than ${maxLength} characters`
    );

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
