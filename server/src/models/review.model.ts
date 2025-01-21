import { PaginateModel, Schema, model } from "mongoose";
import { imageSchema } from "./user.model";
import mongoosePaginate from "mongoose-paginate-v2";
import { ReviewModel } from "../types/review";

export const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    images: [imageSchema],
    rating: {
      type: Number,
      min: [1, "Rating must be greater than 1"],
      max: [5, "Rating must be less than 5"],
    },
    is_modified: { type: Boolean, default: false },
  },
  { timestamps: true },
);
reviewSchema.plugin(mongoosePaginate);
reviewSchema.index({ title: "text", content: "text" });
const Review = model<ReviewModel, PaginateModel<ReviewModel>>(
  "Review",
  reviewSchema,
);

export default Review;
