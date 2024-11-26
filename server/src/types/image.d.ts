import { z } from "zod";
import { imageSchema } from "../validation-schemas/product-schemas/product.validation";

export type Image = z.infer<typeof imageSchema>;
