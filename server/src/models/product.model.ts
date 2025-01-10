import { PaginateModel, Schema, model } from "mongoose";
import { imageSchema } from "./user.model";
import mongoosePaginate from "mongoose-paginate-v2";
import { ProductDocument } from "../types/product";

const userQuestionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    answer: String,
    isAnswered: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const productSpecification = new Schema(
  {
    dimensions: {
      width: Number,
      depth: Number,
      height: Number,
    },
    material: String,
    finish: String,
    assemblyRequired: Boolean,
    weightCapacity: Number,
  },
  { _id: false },
);

export const productSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: { type: Number, default: 0, min: 0 },
    finalPrice: { type: Number, default: 0, min: 0 },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    isDeleted: { type: Boolean, default: false },

    specifications: productSpecification,
    brand: [String],
    images: [imageSchema],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    wishlistCount: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    productQuestions: { type: [userQuestionSchema], select: false },
    averageReview: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);
productSchema.index({ name: "text", description: "text" });
productSchema.plugin(mongoosePaginate);
export const Product = model<ProductDocument, PaginateModel<ProductDocument>>(
  "Product",
  productSchema,
);
