import { z } from "zod";
import { abstractSchema, createMongooseObjectId } from "../utils/zod.utils";

export const orderItemInputSchema = z.object({
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  product: createMongooseObjectId(),
  seller: createMongooseObjectId(),
});

export const orderItemSchema = abstractSchema().merge(orderItemInputSchema);

export const orderInputSchema = z.object({
  totalPrice: z.coerce.number(),
  orderItems: z.array(orderItemSchema),
});

export const orderSchema = z.object({
  customId: createMongooseObjectId(),
  status: z
    .enum(["pending", "processing", "shipped", "delivered"])
    .default("pending"),
});

export const orderSchemaComplete = abstractSchema()
  .merge(orderSchema)
  .merge(orderInputSchema);
