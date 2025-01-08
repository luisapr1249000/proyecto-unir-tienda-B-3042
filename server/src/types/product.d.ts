import { z } from "zod";
import {
  productInputSchema,
  productSchema,
} from "../validation-schemas/product-schemas/product.validation";
import { productQuestionSchema } from "../validation-schemas/product-schemas/productQuestions.validation";
import { Document, Types } from "mongoose";

export type ProductQuestion = z.infer<typeof productQuestionSchema>;

export type ProductInput = z.infer<typeof productInputSchema>;
export type Product = z.infer<typeof productSchema> & {
  productQuestions: Types.DocumentArray<ProductQuestion>;
};
export type ProductDocument = Document & Product;
