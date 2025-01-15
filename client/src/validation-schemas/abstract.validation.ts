import { z } from "zod";
import { objectIdValidator } from "../utils/zod.utils";
export const abstractSchema = () =>
  z.object({
    _id: objectIdValidator,
    createdAt: z.date(),
    updatedAt: z.date(),
  });
