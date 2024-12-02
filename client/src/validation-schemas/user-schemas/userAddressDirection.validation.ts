import { z } from "zod";
import {
  abstractSchema,
  basicString,
  createValidStringField,
} from "../abstract.validation";

export const pinCodeField = createValidStringField({
  fieldName: "pin Code",
  maxLength: 15,
});
export const localityField = createValidStringField({
  fieldName: "locality",
  maxLength: 50,
});

export const addressLine1Field = createValidStringField({
  fieldName: "Address Line 1",
  maxLength: 50,
});
export const addressLine2Field = createValidStringField({
  fieldName: "Address Line 2",
  maxLength: 50,
});

export const cityDistrictTownField = createValidStringField({
  fieldName: "city District Town Field",
  maxLength: 40,
});

export const stateField = createValidStringField({
  fieldName: "State",
  maxLength: 50,
});
export const landmarkField = createValidStringField({
  fieldName: "Landmark",
  maxLength: 40,
});

export const addressDirectionInputSchema = z.object({
  phoneNumber: basicString.optional(),
  pinCode: pinCodeField,
  locality: localityField,
  addressLine1: addressLine1Field,
  addressLine2: addressLine2Field.optional(),
  cityDistrictTown: cityDistrictTownField,
  state: stateField,
  landmark: landmarkField,
  alternatePhone: basicString.optional(),
  addressType: z.enum(["home", "work"]),
});

export const addressDirection = abstractSchema.merge(
  addressDirectionInputSchema
);
