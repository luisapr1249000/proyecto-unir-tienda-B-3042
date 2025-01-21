import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { CategoryModel, CategoryType } from "../types/category";

export const categorySchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    name: {
      type: String,
      unique: true,
      required: true,
      maxlength: [50, "Name must be less than 50 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,

    statics: {
      findByName: async function (name: string) {
        return this.findOne({ name });
      },
      findByAuthor: async function (authorId: string) {
        return this.find({ author: authorId });
      },
      findExistingCategory: async function (name: string) {
        return this.findOne({ name });
      },
    },
  },
);

categorySchema.plugin(mongoosePaginate);
export const Category = model<CategoryType, CategoryModel>(
  "Category",
  categorySchema,
);
