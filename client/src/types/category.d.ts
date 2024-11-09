import { z } from "zod";
import {
  categoryInputSchema,
  categorySchema,
} from "../validation-schemas/category.validation";

export type Category = z.infer<typeof categorySchema>;
export type CategoryInput = z.infer<typeof categoryInputSchema>;
