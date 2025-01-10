import z from "zod";
import {
  reportInputSchema,
  reportSchema,
  reportUpdateSchema,
} from "../validation-schemas/report.validation";
import { Document } from "mongoose";

export type ReportInput = z.infer<typeof reportInputSchema>;
export type ReportUpdate = z.infer<typeof reportUpdateSchema>;
export type Report = z.infer<typeof reportSchema>;
export type ReportDocument = Document & Report;
