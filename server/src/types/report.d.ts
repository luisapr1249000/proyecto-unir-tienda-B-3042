import z from "zod";
import {
  reportInputSchema,
  reportUpdateSchema,
} from "../validation-schemas/report.validation";
import { reportSchema as modelReportSchema } from "../models/report.model";
import { InferSchemaType } from "mongoose";

export type ReportInput = z.infer<typeof reportInputSchema>;
export type ReportUpdate = z.infer<typeof reportUpdateSchema>;

export type ReportModel = InferSchemaType<typeof modelReportSchema>;
