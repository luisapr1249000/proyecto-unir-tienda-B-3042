import { z } from "zod";

import { specificationsSchema } from "./productSpecifications.validation";
import {
  createPositiveIntegerField,
  createPositiveNumberField,
  createValidStringField,
  objectIdValidator,
} from "../../utils/zod.utils";

// -------------------------------------------------------
const productNameField = createValidStringField({
  fieldName: "Product Name",
  maxLength: 50,
});
const productDescriptionField = createValidStringField({
  fieldName: "Product Description",
  maxLength: 500,
});

const quantityField = createPositiveIntegerField({ fieldName: "Quantity" });
const priceField = createPositiveNumberField({
  fieldName: "Price",
  multipleOf: 0.01,
});

const discountField = createPositiveNumberField({
  fieldName: "Discount",
  multipleOf: 0.01,
});

export const productInputSchema = z.object({
  name: productNameField,
  description: productDescriptionField,
  categories: z
    .array(objectIdValidator("Category"))
    .refine((items) => new Set(items).size === items.length, {
      message: "All categories must be unique",
    }),
  price: priceField,
  quantity: quantityField,
  specifications: specificationsSchema,
  discount: discountField.optional(),
});
