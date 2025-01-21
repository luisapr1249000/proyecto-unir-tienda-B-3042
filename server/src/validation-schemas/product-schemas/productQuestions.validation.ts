import { z } from "zod";
import { createValidStringField } from "../../utils/zod.utils";

const productQuestionInputField = createValidStringField({
  fieldName: "User Question Content",
  maxLength: 100,
});
const productQuestionInputAnswerField = createValidStringField({
  fieldName: "User Question Answer",
  maxLength: 100,
});

export const productQuestionInputSchema = z.object({
  content: productQuestionInputField,
});
export const productAnswerInputSchema = z.object({
  answer: productQuestionInputAnswerField,
});
