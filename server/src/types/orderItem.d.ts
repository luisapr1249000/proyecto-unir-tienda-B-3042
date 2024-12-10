import { z } from "zod";
import { Document } from "mongoose";
import {
  orderItemInputSchema,
  orderItemSchema,
} from "../validation-schemas/order.validation";

export type OrderItemInput = z.infer<typeof orderItemInputSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type OrderItemDocument = Document & OrderItem;
