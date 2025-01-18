import { z } from "zod";
import {
  reasonField,
  reportInputSchema,
  reportResolutionSchema,
  reportSchema,
} from "../validation-schemas/report.validation";

export type Reason = z.infer<typeof reasonField>;
export type Report = z.infer<typeof reportSchema>;
export type ReportInput = z.infer<typeof reportInputSchema>;
export type ReportResolution = z.infer<typeof reportResolutionSchema>;
export type ReportedItemId = { reportedItemId: string };
