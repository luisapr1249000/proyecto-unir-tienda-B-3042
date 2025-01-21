import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ReportModel, ReportType } from "../types/report";

export const reportSchema = new Schema(
  {
    reportedItem: {
      type: Schema.Types.ObjectId,
      required: [true, "Reported item is required"],
      refPath: "itemType",
    },
    itemType: {
      type: String,
      required: [true, "Item type is required"],
      enum: ["Product", "Review", "User", "Category"],
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reporter is required"],
    },
    reason: {
      type: String,
      enum: [
        "Spam",
        "Inappropriate Content",
        "Misleading Information",
        "Other",
      ],
      required: true,
      index: "text",
    },
    problemDescription: { type: String, trim: true },
    resolved: { type: Boolean, default: false },
    resolution: { type: String, trim: true },
  },
  { timestamps: true },
);

reportSchema.index(
  { reporter: 1, reportedItem: 1, itemType: 1 },
  { unique: true },
);

reportSchema.plugin(mongoosePaginate);
const Report = model<ReportType, ReportModel>("Report", reportSchema);
export default Report;
