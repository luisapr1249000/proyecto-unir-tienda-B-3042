import { z } from "zod";
import {
  productInputSchema,
  productSchema,
  userQuestionInput,
  userQuestionInputAnswer,
  userQuestionSchema,
} from "../validation-schemas/product.validation";
import { Document, Types } from "mongoose";

export type UserQuestionContent = z.infer<typeof userQuestionInput>;
export type UserQuestionInputAnswer = z.infer<typeof userQuestionInputAnswer>;
export type UserQuestion = z.infer<typeof userQuestionSchema>;

export type ProductInput = z.infer<typeof productInputSchema>;
export type Product = z.infer<typeof productSchema> & {
  userQuestions: Types.DocumentArray<UserQuestion>;
};
export type ProductDocument = Document & Product;
