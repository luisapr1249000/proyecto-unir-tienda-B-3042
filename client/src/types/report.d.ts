import { z } from "zod";
import {
  reportInputSchema,
  reportResolutionSchema,
  reportSchema,
} from "../validation-schemas/report.validation";

export type Report = z.infer<typeof reportSchema>;
export type ReportInput = z.infer<typeof reportInputSchema>;
export type ReportResolution = z.infer<typeof reportResolutionSchema>;
