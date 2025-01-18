import { z } from "zod";
import {
  abstractSchema,
  createMongooseObjectId,
  createValidStringField,
} from "../utils/zod.utils";

const problemDescriptionField = createValidStringField({
  fieldName: "Problem Description",
  maxLength: 200,
});

const resolutionField = createValidStringField({
  fieldName: "Resolution",
  maxLength: 200,
});

export const reportInputSchema = z.object({
  reason: z.enum([
    "Spam",
    "Inappropriate Content",
    "Misleading Information",
    "Other",
  ]),
  itemType: z.enum(["Product", "Review", "User", "Category"]),
  problemDescription: problemDescriptionField.optional(),
});

export const reportResolutionSchema = z.object({ resolution: resolutionField });

export const reportProps = z.object({
  reporter: createMongooseObjectId(),
  resolution: resolutionField.optional(),
  reportedItem: createMongooseObjectId(),
  resolved: z.boolean(),
});

export const reportSchema = abstractSchema()
  .merge(reportInputSchema)
  .merge(reportProps);
