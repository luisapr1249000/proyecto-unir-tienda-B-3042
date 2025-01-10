import { model, Schema, PaginateModel } from "mongoose";
import { ReportDocument } from "../types/report";
import mongoosePaginate from "mongoose-paginate-v2";

const reportSchema = new Schema(
  {
    reportedItem: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "itemType",
    },
    itemType: {
      type: String,
      required: true,
      enum: ["Product", "Review"],
    },
    reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

reportSchema.index(
  { reporter: 1, reportedItem: 1, itemType: 1 },
  { unique: true },
);

reportSchema.plugin(mongoosePaginate);
const Report = model<ReportDocument, PaginateModel<ReportDocument>>(
  "Report",
  reportSchema,
);
export default Report;
