import { z } from "zod";
import { orderInputSchema } from "../validation-schemas/order.validation";
import { InferSchemaType } from "mongoose";
import { orderSchema as modelOrderSchema } from "../models/order.model";

export type OrderInput = z.infer<typeof orderInputSchema>;

export type OrderModel = InferSchemaType<typeof modelOrderSchema>;
