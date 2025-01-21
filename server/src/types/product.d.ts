/* eslint-disable no-unused-vars */
import { z } from "zod";
import { productInputSchema } from "../validation-schemas/product-schemas/product.validation";
import { productQuestionSchema } from "../validation-schemas/product-schemas/productQuestions.validation";
import { InferSchemaType, PaginateModel } from "mongoose";
import { productSchema as modelProductSchema } from "../models/product.model";

export type ProductQuestion = z.infer<typeof productQuestionSchema>;

export type ProductInput = z.infer<typeof productInputSchema>;

export type ProductType = InferSchemaType<typeof modelProductSchema>;

export interface ProductMethod {
  findByAuthor: (authorId: string) => Promise<HydratedDocument<ProductType>>;
  findByCategory: (
    categoryId: string,
  ) => Promise<HydratedDocument<ProductType>>;
  findByName: (name: string) => Promise<HydratedDocument<ProductType>>;
}

export type ProductModel = PaginateModel<ProductType> & ProductMethod;
