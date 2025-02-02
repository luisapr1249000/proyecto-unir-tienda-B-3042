import { z } from "zod";
import {
  letterNumberDotHyphenUnderscoreRegex,
  lowercaseRegex,
  symbolRegex,
  uppercaseRegex,
} from "../constants/regex";
import { Types } from "mongoose";
import validator from "validator";

export const objectIdValidator = (fieldName = "_id") =>
  z
    .string()
    .min(1, { message: `${fieldName} is required` })
    .refine((value) => Types.ObjectId.isValid(value), {
      message: "Invalid ObjectId format",
      path: ["value"],
    });

export const createBasicString = () => z.string().trim();

export const createBasicNumber = () =>
  z.coerce.number().finite({ message: "Value must be a finite number" });

export const createValidStringField = ({
  fieldName,
  minLength = 1,
  maxLength = 30,
}: {
  fieldName: string;
  minLength?: number;
  maxLength?: number;
}) =>
  createBasicString()
    .min(minLength, { message: `${fieldName} required -----` })
    .max(maxLength, {
      message: `${fieldName} must be no more than ${maxLength} characters`,
    });

export const createPositiveNumberField = ({
  fieldName,
  minValue = 1,
  maxValue,
  multipleOf,
}: {
  fieldName: string;
  minValue?: number;
  maxValue?: number;
  multipleOf?: number;
}) => {
  let field = createBasicNumber()
    .min(minValue, `${fieldName} must be at least ${minValue}`)
    .nonnegative("Value must be a positive number");
  if (maxValue) {
    field = field.max(maxValue);
  }
  if (multipleOf) {
    field = field.multipleOf(
      multipleOf,
      'Just enter a number with two decimal places, for example "10.00"',
    );
  }
  return field;
};

export const createPositiveIntegerField = ({
  fieldName,
  minValue = 1,
  maxValue,
}: {
  fieldName: string;
  minValue?: number;
  maxValue?: number;
}) => {
  let field = createBasicNumber()
    .min(minValue, `${fieldName} must be at least ${minValue}`)
    .int("Value must be an integer")
    .nonnegative("Value must be a positive integer");
  if (maxValue) {
    field = field.max(maxValue, `Value must not exceed ${maxValue}`);
  }
  return field;
};

export const createEmailField = () =>
  createBasicString()
    .email("Email must be a valid email address")
    .min(1, "Email must not be empty")
    .max(100, "Email must not exceed 100 characters");

export const createPasswordSchema = () =>
  z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      uppercaseRegex,
      "Password must contain at least one uppercase letter",
    )
    .regex(
      lowercaseRegex,
      "Password must contain at least one lowercase letter",
    )
    .regex(symbolRegex, "Password must contain at least one symbol");

export const confirmPasswordSchema = () =>
  z
    .object({
      password: createPasswordSchema(),
      confirmPassword: z.string(),
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      message: "Passwords do not match",
      path: ["Confirm"],
    });

export const createNoWhitespaceString = (field: string, maxLength = 35) =>
  createValidStringField({ fieldName: field, maxLength: maxLength }).regex(
    letterNumberDotHyphenUnderscoreRegex,
    "Only letters, numbers, dots, hyphens, and underscores are allowed",
  );

export const phoneNumberSchema = () =>
  z.string().trim().min(1).refine(validator.isMobilePhone);

export const is_modifiedField = () =>
  z.object({
    is_modified: z.boolean().default(false),
  });
