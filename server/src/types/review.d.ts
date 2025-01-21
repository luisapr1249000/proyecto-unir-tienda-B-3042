import { InferSchemaType } from "mongoose";
import { reviewSchema as modelReviewSchema } from "../models/review.model";
import { z } from "zod";
import { reviewInputSchema } from "../validation-schemas/review.validation";

export type ReviewInput = z.infer<typeof reviewInputSchema>;

export type ReviewModel = InferSchemaType<typeof modelReviewSchema>;
