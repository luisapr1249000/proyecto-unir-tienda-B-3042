import { z } from "zod";
import { abstractSchema } from "./abstract.validation";

export const commonProperties = z.object({
  reportedPost: z.string().trim().min(24),
  reporter: z.string().trim().min(24),
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
