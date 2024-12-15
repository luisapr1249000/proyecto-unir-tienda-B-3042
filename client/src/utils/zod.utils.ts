import { z } from "zod";

export const AlphanumericAndDotsRegex = /^[a-zA-Z0-9.]+$/;
export const numericRegex = /^[0-9]+$/;
export const lettersRegex = /^[a-zA-Z]+$/;
export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/;

export const noSpacesRegex = /^\S*$/;
export const basicStringField = z.string().trim();

export const emailStringField = basicStringField
  .email("Email is invalid")
  .transform((value) => value.toLowerCase());

export const passwordStringField = basicStringField.regex(
  passwordRegex,
  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
);

export const alphanumericStringField = basicStringField.regex(
  AlphanumericAndDotsRegex,
  "Alphanumeric string is invalid"
);

export const noSpacesField = basicStringField.regex(
  noSpacesRegex,
  "No spaces allowed"
);

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

export const createPositiveNumberField = ({
  fieldName,
  maxValue,
}: {
  fieldName: string;
  maxValue?: number;
}) => {
  const schema = z.coerce
    .number()
    .nonnegative(`The ${fieldName} must be positive`)
    .multipleOf(0.01, `The ${fieldName} must have 2 decimals`);

  if (maxValue) {
    schema.max(maxValue, `The ${fieldName} must not exceed ${maxValue}`);
  }

  return schema;
};

export const createIntField = ({
  fieldName,
  maxValue,
}: {
  fieldName: string;
  maxValue?: number;
}) => {
  const schema = z.coerce
    .number()
    .int(`The ${fieldName} must be int`)
    .nonnegative(`The ${fieldName} must be positive`);

  if (maxValue) {
    schema.max(maxValue, `The ${fieldName} must not exceed ${maxValue}`);
  }

  return schema;
};
