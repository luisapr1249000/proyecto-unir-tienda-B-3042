import { z } from "zod";
import { abstractSchema } from "../abstract.validation";
import {
  basicStringField,
  createValidStringField,
} from "../../utils/zod.utils";
const userQuestionInputField = createValidStringField({
  fieldName: "User Question Content",
  maxLength: 150,
});
const userQuestionInputAnswerField = createValidStringField({
  fieldName: "User Question Answer",
  maxLength: 150,
});

export const productUserQuestionSchema = z.object({
  questionContent: userQuestionInputField,
});
export const productQuestionAnswer = z.object({
  answerContent: userQuestionInputAnswerField,
});
export const productQuestionOptionalAnswer = z.object({
  answerContent: z.string().optional(),
});

export const userQuestionOtherValues = z.object({
  user: basicStringField,
  isAnswered: z.boolean().default(false),
});

export const userQuestionSchema = abstractSchema
  .merge(productUserQuestionSchema)
  .merge(productQuestionAnswer)
  .merge(userQuestionOtherValues);
