import { z } from "zod";
import {
  lowercaseRegex,
  objectIdRegex,
  symbolRegex,
  uppercaseRegex,
  letterNumberDotHyphenUnderscoreRegex as noSpacesRegex,
  phoneNumberRegex,
} from "../constants/regex";

export const objectIdValidator = z
  .string()
  .min(24, "ObjectId is too short")
  .max(24, "ObjectId is too long")
  .regex(objectIdRegex, "ObjectId is invalid");

export const createBasicString = () => z.string().trim();
export const createBasicNumber = () =>
  z.coerce.number().finite({ message: "Value must be a finite number" });

export const createEmailField = () =>
  createBasicString()
    .email("Email must be a valid email address")
    .min(1, "Email must not be empty")
    .max(100, "Email must not exceed 100 characters");

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
      'Just enter a number with two decimal places, for example "10.00"'
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
    .int("Value must not be a decimal")
    .nonnegative("Value must be a positive integer");
  if (maxValue) {
    field = field.max(maxValue, `Value must not exceed ${maxValue}`);
  }
  return field;
};

export const createPasswordSchema = () =>
  z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      uppercaseRegex,
      "Password must contain at least one uppercase letter"
    )
    .regex(
      lowercaseRegex,
      "Password must contain at least one lowercase letter"
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

export const noWhiteSpaceField = () =>
  createValidStringField({ fieldName: "Username" }).regex(
    noSpacesRegex,
    "No spaces are allowed"
  );

export const phoneNumberField = () =>
  createValidStringField({ fieldName: "Phone Number", maxLength: 10 }).regex(
    phoneNumberRegex,
    "Phone number is invalid"
  );

export const is_modifiedField = () =>
  z.object({
    is_modified: z.boolean().optional(),
  });
