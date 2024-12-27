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

export const reportedTypeSchema = z.object({
  reportedType: z.enum(["product", "comment"]),
});

export const reportInputSchema = z.object({
  reason: z.enum([
    "Spam",
    "Inappropriate Content",
    "Misleading Information",
    "Other",
  ]),
  problemDescription: problemDescriptionField.optional(),
});

export const reportProps = z.object({
  reporter: createMongooseObjectId(),
  reportedProduct: createMongooseObjectId().optional(),
  reportedReview: createMongooseObjectId().optional(),
});

export const reportSchema = abstractSchema()
  .merge(reportInputSchema)
  .merge(reportProps);
