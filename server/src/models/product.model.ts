import { PaginateModel, Schema, model } from "mongoose";
import { imageSchema } from "./user.model";
import mongoosePaginate from "mongoose-paginate-v2";
import { ProductDocument } from "../types/product";

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
    viewCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },

    specifications: {
      dimensions: {
        width: String,
        depth: String,
        height: String,
      },
      material: String,
      finish: String,
      assemblyRequired: Boolean,
      weightCapacity: Number,
    },
    brand: [String],
    images: [imageSchema],
    discount: { type: Number, default: 0 },
  },
  {
    virtuals: {
      finalPrince: {
        get() {
          return this.price * (1 - this.discount / 100);
        },
      },
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

productSchema.index({ name: "text", description: "text" });
productSchema.plugin(mongoosePaginate);
export const Product = model<ProductDocument, PaginateModel<ProductDocument>>(
  "Product",
  productSchema,
);
