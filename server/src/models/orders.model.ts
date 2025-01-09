import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { OrderDocument } from "../types/order";
import { createAddressSchema } from "../utils/mongoose-schemas/mongoose.utils";

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: createAddressSchema({ withId: false }),
    paymentMethod: String,
  },
  { timestamps: true },
);
orderSchema.plugin(mongoosePaginate);
export const Order = model<OrderDocument, PaginateModel<OrderDocument>>(
  "Order",
  orderSchema,
);
