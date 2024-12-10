import { z } from "zod";
import {
  abstractSchema,
  mongooseObjectId,
  objectIdValidator,
} from "./abstract.validation";

export const orderItemInputSchema = z.object({
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  product: mongooseObjectId,
  seller: mongooseObjectId,
});

export const orderItemSchema = abstractSchema.merge(orderItemInputSchema);

export const orderInputSchema = z.object({
  totalPrice: z.coerce.number(),
  orderItems: z.array(orderItemSchema),
});

export const orderSchema = z.object({
  customId: objectIdValidator,
  status: z
    .enum(["pending", "processing", "shipped", "delivered"])
    .default("pending"),
});

export const orderSchemaComplete = abstractSchema
  .merge(orderSchema)
  .merge(orderInputSchema);
