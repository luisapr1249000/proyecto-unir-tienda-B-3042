import { z } from "zod";
import { orderItemInputSchema } from "../validation-schemas/order.validation";

export type OrderItemInput = z.infer<typeof orderItemInputSchema>;
