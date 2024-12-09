import { z } from "zod";
import { abstractSchema, objectIdValidator } from "./abstract.validation";

export const reportTypeSchema = z.object({
  reportType: z.enum(["product", "comment"]),
});

export const reportInputSchema = z.object({
  reason: z.enum([
    "Spam",
    "Inappropriate Content",
    "Misleading Information",
    "Other",
  ]),
  problemDescription: z.string().min(1).optional(),
});

export const reportProps = z.object({
  reporter: objectIdValidator,
  reportedProduct: objectIdValidator.optional(),
  reportedReview: objectIdValidator.optional(),
});

export const reportSchema = abstractSchema
  .merge(reportInputSchema)
  .merge(reportProps);
