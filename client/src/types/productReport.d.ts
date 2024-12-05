import { z } from "zod";
import {
  productReportSchema,
  reportInputSchema,
} from "../validation-schemas/productReport.validation";

export type ProductReport = z.infer<typeof productReportSchema>;
export type ProductReportInput = z.infer<typeof reportInputSchema>;
