import { model, Schema } from "mongoose";

const reportSchema = new Schema(
  {
    reportedProduct: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
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

reportSchema.index({ reportedPost: 1, reporter: 1 }, { unique: true });
const Report = model("Product Report", reportSchema);
export default Report;
