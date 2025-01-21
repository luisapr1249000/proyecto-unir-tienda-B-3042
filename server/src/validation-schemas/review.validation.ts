import { z } from "zod";
import {
  createPositiveIntegerField,
  createValidStringField,
} from "../utils/zod.utils";

const reviewContentField = createValidStringField({
  fieldName: "content",
  maxLength: 200,
});

const ratingField = createPositiveIntegerField({
  fieldName: "review",
  maxValue: 5,
});

const reviewTitleField = createValidStringField({
  fieldName: "title",
  maxLength: 100,
});

export const reviewInputSchema = z.object({
  reviewTitle: reviewTitleField,
  content: reviewContentField,
  rating: ratingField,
});
