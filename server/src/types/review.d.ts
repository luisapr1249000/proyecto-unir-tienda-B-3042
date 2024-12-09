import { Document } from "mongoose";
import { reviewSchema } from "../validation-schemas/review.validation";
import { z } from "zod";

export type Review = z.infer<typeof reviewSchema>;
export type ReviewDocument = Document & Review;
