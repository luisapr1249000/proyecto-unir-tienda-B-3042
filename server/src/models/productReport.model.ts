import { model, Schema } from "mongoose";
import { ProductReport } from "../types/productReport";

const productReportSchema = new Schema(
  {
    reportedPost: { type: Schema.Types.ObjectId, ref: "Post", required: false },
    reportedReview: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      required: false,
    },
    reporter: { type: Schema.Types.ObjectId, ref: "User" },
    reason: {
      type: String,
      enum: [
        "Spam",
        "Inappropriate Content",
        "Misleading Information",
        "Other",
      ],
      required: true,
    },
    problemDescription: String,
    resolved: { type: Boolean, default: false },
    resolution: String,
  },
  { timestamps: true },
);

productReportSchema.index({ reportedPost: 1, reporter: 1 }, { unique: true });
const ProductReport = model("Product Report", productReportSchema);
export default ProductReport;
