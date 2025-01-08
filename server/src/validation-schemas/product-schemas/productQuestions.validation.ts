import { z } from "zod";
import {
  abstractSchema,
  createMongooseObjectId,
  createValidStringField,
} from "../../utils/zod.utils";

const productQuestionInputField = createValidStringField({
  fieldName: "User Question Content",
  maxLength: 150,
});
const productQuestionInputAnswerField = createValidStringField({
  fieldName: "User Question Answer",
  maxLength: 150,
});

export const productQuestionInputSchema = z.object({
  content: productQuestionInputField,
});
export const productAnswerInputSchema = z.object({
  answer: productQuestionInputAnswerField,
});
export const productQuestionOtherValues = z.object({
  user: createMongooseObjectId(),
  isAnswered: z.boolean(),
});

export const productQuestionSchema = abstractSchema()
  .merge(productQuestionInputSchema)
  .merge(productAnswerInputSchema)
  .merge(productQuestionOtherValues);
