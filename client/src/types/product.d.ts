import { z } from "zod";
import {
  productInputSchema,
  productSchema,
  productUpdateInput,
  productUserQuestionId,
} from "../validation-schemas/product-schemas/product.validation";
import {
  productQuestionAnswer,
  productQuestionOptionalAnswer,
  productUserQuestionSchema,
} from "../validation-schemas/product-schemas/product.user.question.validation";

export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateInput>;

export type ProductId = { productId: string };

export type ProductProp = { product: Product };

export type ProductQuestionContent = z.infer<typeof productUserQuestionSchema>;
export type ProductQuestionContentAnswer = z.infer<
  typeof productQuestionAnswer
>;

export type ProductQuestionOptionaContentAnswer = z.infer<
  typeof productQuestionOptionalAnswerr
>;

export type ProductUserQuestionId = z.infer<typeof productUserQuestionId>;
