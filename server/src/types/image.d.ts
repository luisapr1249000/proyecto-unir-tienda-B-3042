import { z } from "zod";
import { imageSchema } from "../validation-schemas/image.schema";

export type Image = z.infer<typeof imageSchema>;
