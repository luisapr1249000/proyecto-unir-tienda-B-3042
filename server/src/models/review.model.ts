import { PaginateModel, Schema, model } from "mongoose";
import { imageSchema } from "./user.model";
import mongoosePaginate from "mongoose-paginate-v2";
import { ReviewDocument } from "../types/review";

export const reviewSchema = new Schema(
  {
    content: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    images: [imageSchema],
    review: { type: Number, default: undefined, min: 1, max: 5 },
    is_modified: { type: Boolean, default: false },
  },
  { timestamps: true },
);
reviewSchema.plugin(mongoosePaginate);

const Review = model<ReviewDocument, PaginateModel<ReviewDocument>>(
  "Review",
  reviewSchema,
);

export default Review;
