import { z } from "zod";
import {
  categoryInputSchema,
  categorySchema,
} from "../validation-schemas/category.validation";
import { Link } from "./abstract";

export type Category = z.infer<typeof categorySchema>;
export type CategoryInput = z.infer<typeof categoryInputSchema>;
export type CategoryId = { categoryId: string };

export type CategoryAndLink = Category & Link;
