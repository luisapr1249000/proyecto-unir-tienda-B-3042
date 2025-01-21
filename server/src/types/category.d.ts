import { z } from "zod";
import { categoryInputSchema } from "../validation-schemas/category.validation";
import { HydratedDocument, InferSchemaType, PaginateModel } from "mongoose";
import { categorySchema as modelCategorySchema } from "../models/category.model";

export type CategoryInput = z.infer<typeof categoryInputSchema>;
export type CategoryType = InferSchemaType<typeof modelCategorySchema>;

export interface CategoryModel extends PaginateModel<CategoryType> {
  findExistingCategory: (
    name: string,
  ) => Promise<HydratedDocument<CategoryCollection>>;
  findByName: (name: string) => Promise<HydratedDocument<CategoryCollection>>;
  findByAuthor: (
    authorId: string,
  ) => Promise<HydratedDocument<CategoryCollection>>;
}
