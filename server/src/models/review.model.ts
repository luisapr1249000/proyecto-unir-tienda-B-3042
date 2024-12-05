import { PaginateModel, Schema, model } from "mongoose";
import { imageSchema } from "./user.model";
import mongoosePaginate from "mongoose-paginate-v2";
import { CommentDocument } from "../types/comment";

export const reviewSchema = new Schema(
  {
    content: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    images: [imageSchema],
    review: { type: Number, default: undefined, min: 1, max: 5 },
  },
  { timestamps: true },
);
reviewSchema.plugin(mongoosePaginate);

const Review = model<CommentDocument, PaginateModel<CommentDocument>>(
  "Review",
  reviewSchema,
);

export default Review;
