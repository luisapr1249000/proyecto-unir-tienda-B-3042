import { z } from "zod";
import {
  productInputSchema,
  productSchema,
  productUpdateInput,
  productUserQuestionId,
} from "../validation-schemas/product-schemas/product.validation";
import {
  productAnswerInputSchema,
  productQuestionInputSchema,
  productQuestionSchema,
} from "../validation-schemas/product-schemas/productQuestions.validation";

export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;

export type ProductId = { productId: string };

export type ProductProp = { product: Product };

export type ProductQuestionContent = z.infer<typeof productQuestionInputSchema>;
export type ProductQuestionAnswer = z.infer<typeof productAnswerInputSchema>;

export type ProductUserQuestionId = z.infer<typeof productUserQuestionId>;
export type ProductQuestion = z.infer<typeof productQuestionSchema>;
