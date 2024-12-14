import { z } from "zod";
import { createValidStringField } from "../abstract.validation";

const specificationsWidth = createValidStringField({
  fieldName: "specification width",
  maxLength: 10,
});

const specificationsDepth = createValidStringField({
  fieldName: "specification width",
  maxLength: 10,
});
const specificationsHeight = createValidStringField({
  fieldName: "specification width",
  maxLength: 10,
});

const specificationMaterial = createValidStringField({ fieldName: "material" });
const specificationFinish = createValidStringField({ fieldName: "finish" });
export const specificationsSchema = z.object({
  dimensions: z
    .object({
      width: specificationsWidth.optional(),
      depth: specificationsDepth.optional(),
      height: specificationsHeight.optional(),
    })
    .optional(),
  material: specificationMaterial.optional(),
  finish: specificationFinish.optional(),
  assemblyRequired: z.boolean().optional(),
  weightCapacity: z.number().optional(),
});
