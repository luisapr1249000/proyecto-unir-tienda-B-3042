import { z } from "zod";

export const imageSchema = z.object({
  originalName: z.string(),
  url: z.string().url("Invalid image URL"),
  contentType: z.string(),
  size: z.number().nonnegative("Size must be a non-negative number"),
});
