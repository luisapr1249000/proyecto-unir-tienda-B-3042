import { z } from "zod";
import {
  createPositiveIntegerField,
  objectIdValidator,
} from "../utils/zod.utils";
import { addressDirectionInputSchema } from "./user-schemas/address.validation";

const quantityField = createPositiveIntegerField({ fieldName: "quantity" });

export const statusFieldSchema = z.object({
  status: z
    .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
    .default("pending"),
});
export const orderItemInputSchema = z.object({
  product: objectIdValidator(),
  quantity: quantityField,
});

export const orderInputSchema = z.object({
  orderItems: z.array(orderItemInputSchema),
  shippingAddress: addressDirectionInputSchema,
});
