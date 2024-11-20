import { Schema, model } from "mongoose";

const reactSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    type: { type: String, enum: ["like", "dislike"] },
  },
  { timestamps: true },
);
reactSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Reaction = model("Reaction", reactSchema);
export default Reaction;
