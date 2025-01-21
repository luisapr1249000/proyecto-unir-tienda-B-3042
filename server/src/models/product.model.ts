import { Schema, model } from "mongoose";
import { imageSchema } from "./user.model";
import mongoosePaginate from "mongoose-paginate-v2";
import { ProductModel, ProductType } from "../types/product";

const userQuestionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: {
      type: String,
      required: true,
      maxlength: [100, "Content must be less than 100 characters"],
    },
    answer: {
      type: String,
      maxlength: [100, "Answer must be less than 100 characters"],
    },
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
      required: [true, "Author is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name must be less than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [250, "Description must be less than 250 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount must be greater than 0"],
    },
    finalPrice: {
      type: Number,
      default: 0,
      min: [0, "Final price must be greater than 0"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity must be greater than 0"],
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
    wishlistCount: {
      type: Number,
      default: 0,
      min: [0, "Wishlist count must be greater than 0"],
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: [0, "Review count must be greater than 0"],
    },
    productQuestions: { type: [userQuestionSchema], select: false },
    averageReview: { type: Number, default: 0, min: [0, "Average review"] },
    is_modified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    statics: {
      findByAuthor: async function (authorId: string) {
        return this.find({ author: authorId });
      },
      findByCategory: async function (categoryId: string) {
        return this.find({ categories: categoryId });
      },
      findByName: async function (name: string) {
        return this.find({ name: name });
      },
    },
  },
);
productSchema.index({ name: "text", description: "text" });
productSchema.plugin(mongoosePaginate);
export const Product = model<ProductType, ProductModel>(
  "Product",
  productSchema,
);
