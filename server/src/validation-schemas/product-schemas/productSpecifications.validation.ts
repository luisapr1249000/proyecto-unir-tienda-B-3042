import { z } from "zod";
import {
  createPositiveNumberField,
  createValidStringField,
} from "../../utils/zod.utils";

const specificationMaterial = createValidStringField({
  fieldName: "material",
  minLength: 0,
});
const specificationFinish = createValidStringField({
  fieldName: "finish",
  minLength: 0,
});

const specificationsWidth = createPositiveNumberField({
  fieldName: "specification width",
  multipleOf: 0.01,
});

const specificationsDepth = createPositiveNumberField({
  fieldName: "specification depth",
  multipleOf: 0.01,
});

const specificationsHeight = createPositiveNumberField({
  fieldName: "specification height",
  multipleOf: 0.01,
});

const weightCapacityField = createPositiveNumberField({
  fieldName: "weight capacity",
  multipleOf: 0.01,
});

export const specificationsSchema = z
  .object({
    dimensions: z
      .object({
        width: specificationsWidth.optional(),
        depth: specificationsDepth.optional(),
        height: specificationsHeight.optional(),
      })
      .optional(),
    material: specificationMaterial.optional(),
    finish: specificationFinish.optional(),
    assemblyRequired: z.coerce.boolean().optional(),
    weightCapacity: weightCapacityField.optional(),
  })
  .optional();
