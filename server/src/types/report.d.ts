import z from "zod";
import {
  reportInputSchema,
  reportUpdateSchema,
} from "../validation-schemas/report.validation";
import { reportSchema as modelReportSchema } from "../models/report.model";
import { InferSchemaType, PaginateModel } from "mongoose";

export type ReportInput = z.infer<typeof reportInputSchema>;
export type ReportUpdate = z.infer<typeof reportUpdateSchema>;

export type ReportType = InferSchemaType<typeof modelReportSchema>;

export type ReportModel = PaginateModel<ReportType>;
