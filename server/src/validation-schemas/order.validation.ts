import { z } from "zod";
import {
  abstractSchema,
  createMongooseObjectId,
  createPositiveIntegerField,
  createPostiveNumberField,
} from "../utils/zod.utils";

const quantityField = createPositiveIntegerField({ fieldName: "quantity" });
const priceField = createPostiveNumberField({
  fieldName: "price",
  multipleOf: 0.01,
});
const finalPriceField = createPostiveNumberField({
  fieldName: "finalPrice",
  multipleOf: 0.01,
});

export const orderItemInputSchema = z.object({
  quantity: quantityField,
  price: priceField,
  product: createMongooseObjectId(),
  seller: createMongooseObjectId(),
});

export const orderItemSchema = abstractSchema().merge(orderItemInputSchema);

export const orderInputSchema = z.object({
  finalPrice: finalPriceField,
  orderItems: z.array(orderItemSchema),
});

export const orderPropsSchema = z.object({
  customer: createMongooseObjectId(),
  status: z
    .enum(["pending", "processing", "shipped", "delivered"])
    .default("pending"),
});

export const orderSchema = abstractSchema()
  .merge(orderPropsSchema)
  .merge(orderInputSchema);
