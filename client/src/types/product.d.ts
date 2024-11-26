import { z } from "zod";
import {
  productInputSchema,
  productQuestionAnswer,
  productQuestionOptionalAnswer,
  productSchema,
  productUserAnswer,
  productUserQuestionId,
  productUserQuestionSchema,
} from "../validation-schemas/product.validation";

export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;

export type ProductId = { productId: string };

export type ProductProp = { product: Product };

export type ProductQuestionContent = z.infer<typeof productUserQuestionSchema>;
export type ProductQuestionContentAnswer = z.infer<
  typeof productQuestionAnswer
>;

export type ProductQuestionOptionaContentAnswer = z.infer<
  typeof productQuestionOptionalAnswer
>;

export type ProductUserQuestionId = z.infer<typeof productUserQuestionId>;
