import { z } from "zod";
import {
  productInputSchema,
  productSchema,
} from "../validation-schemas/product.validation";

export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;

export type ProductId = { productId: string };
