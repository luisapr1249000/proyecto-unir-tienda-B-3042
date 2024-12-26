import { z } from "zod";
import { abstractSchema } from "../utils/zod.utils";

export const imageSchema = z
  .object({
    originalName: z.string(),
    url: z.string().url("Invalid image URL"),
    contentType: z.string(),
    size: z.number().nonnegative("Size must be a non-negative number"),
  })
  .merge(abstractSchema().pick({ createdAt: true }));
