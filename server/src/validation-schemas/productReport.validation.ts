import { z } from "zod";
import { abstractSchema, mongooseObjectId } from "./abstract.validation";

export const commonProperties = z.object({
  reportedPost: mongooseObjectId,
  reporter: mongooseObjectId,
});

// Input schema
export const reportInputSchema = z.object({
  reason: z.string().min(10).max(500),
});

// Resolution schema
export const resolutionInputSchema = z.object({
  resolution: z.string(),
  resolved: z.boolean().default(false),
});

export const productReportSchema = abstractSchema
  .merge(reportInputSchema)
  .merge(resolutionInputSchema)
  .merge(commonProperties);
