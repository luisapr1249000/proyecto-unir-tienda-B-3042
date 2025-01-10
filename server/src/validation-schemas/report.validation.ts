import { z } from "zod";
import {
  abstractSchema,
  createMongooseObjectId,
  createValidStringField,
  objectIdValidator,
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
  itemType: z.enum(["Product", "Review"]),
  problemDescription: problemDescriptionField.optional(),
  reportedItem: objectIdValidator(),
});

export const reportUpdateSchema = z.object({ resolution: resolutionField });

export const reportProps = z.object({
  reporter: createMongooseObjectId(),
  resolution: resolutionField.optional(),
  reportedItem: createMongooseObjectId(),
});

export const reportSchema = abstractSchema()
  .merge(reportInputSchema.omit({ reportedItem: true }))
  .merge(reportProps);
