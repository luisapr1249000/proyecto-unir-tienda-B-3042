import { Schema, model } from "mongoose";

const viewedProductSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  timestamp: { type: Date, default: Date.now },
});

const ViewedProduct = model("Viewed Product", viewedProductSchema);
export default ViewedProduct;
