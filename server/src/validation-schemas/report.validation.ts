import { z } from "zod";
import { createValidStringField } from "../utils/zod.utils";

const problemDescriptionField = createValidStringField({
  fieldName: "Problem Description",
  maxLength: 200,
});

const resolutionField = createValidStringField({
  fieldName: "Resolution",
  maxLength: 200,
});

export const reportInputSchema = z.object({
  reason: z.enum([
    "Spam",
    "Inappropriate Content",
    "Misleading Information",
    "Other",
  ]),
  itemType: z.enum(["Product", "Review", "User", "Category"]),
  problemDescription: problemDescriptionField.optional(),
});

export const reportResolutionSchema = z.object({ resolution: resolutionField });
