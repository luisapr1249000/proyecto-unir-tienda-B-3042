import { z } from "zod";
import { abstractSchema } from "./abstract.validation";
import { createValidStringField } from "../utils/zod.utils";
import { userSchema } from "./user-schemas/user.validation";
import { productSchema } from "./product-schemas/product.validation";

const problemDescriptionField = createValidStringField({
  fieldName: "Problem Description",
  maxLength: 200,
});

const resolutionField = createValidStringField({
  fieldName: "Resolution",
  maxLength: 200,
});

export const reasonField = z.enum([
  "Spam",
  "Inappropriate Content",
  "Misleading Information",
  "Other",
]);

export const reportInputSchema = z.object({
  reason: reasonField,
  itemType: z.enum(["Product", "Review", "User"]),
  problemDescription: problemDescriptionField.optional(),
});

export const reportResolutionSchema = z.object({ resolution: resolutionField });

export const reportProps = z.object({
  reporter: userSchema,
  resolution: resolutionField.optional(),
  reportedItem: productSchema,
  resolved: z.boolean(),
});

export const reportSchema = abstractSchema()
  .merge(reportInputSchema)
  .merge(reportProps);
