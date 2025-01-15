import { z } from "zod";
import {
  abstractSchema,
  createMongooseObjectId,
  createPositiveIntegerField,
  createPositiveNumberField,
  objectIdValidator,
} from "../utils/zod.utils";
import { addressDirectionInputSchema } from "./user-schemas/address.validation";

const quantityField = createPositiveIntegerField({ fieldName: "quantity" });
const priceField = createPositiveNumberField({
  fieldName: "price",
  multipleOf: 0.01,
});

const subtotalField = createPositiveNumberField({
  fieldName: "subtotal",
  multipleOf: 0.01,
});

const totalPriceField = createPositiveNumberField({
  fieldName: "finalPrice",
  multipleOf: 0.01,
});

export const statusFieldSchema = z.object({
  status: z
    .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
    .default("pending"),
});
export const orderItemInputSchema = z.object({
  product: objectIdValidator(),
  quantity: quantityField,
});

export const orderItemProps = z.object({
  seller: createMongooseObjectId(),
  subtotal: subtotalField,
  price: priceField,
  quantity: quantityField,
  status: statusFieldSchema.shape.status,
  product: createMongooseObjectId(),
});

export const orderItemSchema = abstractSchema()
  .merge(orderItemInputSchema.omit({ product: true }))
  .merge(orderItemProps);

export const orderInputSchema = z.object({
  orderItems: z.array(orderItemInputSchema),
  shippingAddress: addressDirectionInputSchema,
});

export const orderProps = z.object({
  customer: createMongooseObjectId(),
  totalPrice: totalPriceField,
  orderItems: z.array(orderItemSchema),
});
export const orderSchema = abstractSchema()
  .merge(orderInputSchema)
  .merge(orderProps);
