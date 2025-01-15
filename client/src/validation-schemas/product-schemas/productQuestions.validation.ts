import { z } from "zod";
import { createValidStringField } from "../../utils/zod.utils";
import { userSchema } from "../user-schemas/user.validation";
import { abstractSchema } from "../abstract.validation";
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
  user: userSchema,
  isAnswered: z.boolean(),
});

export const productQuestionSchema = abstractSchema()
  .merge(productQuestionInputSchema)
  .merge(productAnswerInputSchema)
  .merge(productQuestionOtherValues);
