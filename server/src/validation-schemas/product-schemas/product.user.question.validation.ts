import { z } from "zod";
import {
  abstractSchema,
  createValidStringField,
  mongooseObjectId,
} from "../abstract.validation";

const userQuestionInputField = createValidStringField({
  fieldName: "User Question Content",
  maxLength: 150,
});
const userQuestionInputAnswerField = createValidStringField({
  fieldName: "User Question Answer",
  maxLength: 150,
});

export const userQuestionInputSchema = z.object({
  content: userQuestionInputField,
});
export const userQuestionInputAnswerSchema = z.object({
  answer: userQuestionInputAnswerField,
});
export const userQuestionOtherValues = z.object({
  user: mongooseObjectId,
  isAnswered: z.boolean().default(false),
});

export const userQuestionSchema = abstractSchema
  .merge(userQuestionInputSchema)
  .merge(userQuestionInputAnswerSchema)
  .merge(userQuestionOtherValues);
