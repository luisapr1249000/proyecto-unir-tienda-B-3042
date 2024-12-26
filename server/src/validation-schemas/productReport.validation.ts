import { z } from "zod";
import { abstractSchema, createMongooseObjectId } from "../utils/zod.utils";

export const commonProperties = z.object({
  reportedPost: createMongooseObjectId(),
  reporter: createMongooseObjectId(),
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

export const productReportSchema = abstractSchema()
  .merge(reportInputSchema)
  .merge(resolutionInputSchema)
  .merge(commonProperties);
