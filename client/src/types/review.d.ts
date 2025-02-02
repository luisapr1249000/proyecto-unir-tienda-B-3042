import { z } from "zod";
import {
  reviewInputSchema,
  reviewSchema,
} from "../validation-schemas/review.validation";

export type Review = z.infer<typeof reviewSchema>;
export type ReviewInput = z.infer<typeof reviewInputSchema>;
export type ReviewId = { reviewId: string };

export type ReviewProps = { review: Review };
export type ReviewData = { data: ReviewInput };
