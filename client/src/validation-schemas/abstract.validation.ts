import { z } from "zod";
export const abstractSchema = z.object({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
