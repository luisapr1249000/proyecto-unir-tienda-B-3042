import { z } from "zod";
import { productReportSchema } from "../validation-schemas/productReport.validation";
import { productInputSchema } from "../validation-schemas/product-schemas/product.validation";

export type ProductReportInput = z.infer<typeof productInputSchema>;
export type ProductReport = z.infer<typeof productReportSchema>;
