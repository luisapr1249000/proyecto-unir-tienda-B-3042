import { z } from "zod";
import {
  createPositiveNumberField,
  createValidStringField,
} from "../../utils/zod.utils";

const specificationsWidth = createPositiveNumberField({
  fieldName: "specification width",
});
const specificationsDepth = createPositiveNumberField({
  fieldName: "specification depth",
});
const specificationsHeight = createPositiveNumberField({
  fieldName: "specification height",
});

const weightCapacity = createPositiveNumberField({
  fieldName: "weight capacity",
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
  weightCapacity: weightCapacity.optional(),
});
