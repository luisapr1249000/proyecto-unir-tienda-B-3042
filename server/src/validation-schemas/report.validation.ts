import { z } from "zod";
import { abstractSchema, createMongooseObjectId } from "../utils/zod.utils";

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
  reporter: createMongooseObjectId(),
  reportedProduct: createMongooseObjectId().optional(),
  reportedReview: createMongooseObjectId().optional(),
});

export const reportSchema = abstractSchema()
  .merge(reportInputSchema)
  .merge(reportProps);
