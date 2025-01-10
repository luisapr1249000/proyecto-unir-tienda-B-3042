import { z } from "zod";
import {
  createPostiveNumberField,
  createValidStringField,
} from "../../utils/zod.utils";

// const specificationsWidth = createValidStringField({
//   fieldName: "specification width",
//   maxLength: 10,
// }).refine((value) => Number(value) > 0, "Width must be greater than 0");

// const specificationsDepth = createValidStringField({
//   fieldName: "specification width",
//   maxLength: 10,
// }).refine((value) => Number(value) > 0, "Width must be greater than 0");
// const specificationsHeight = createValidStringField({
//   fieldName: "specification width",
//   maxLength: 10,
// }).refine((value) => Number(value) > 0, "Width must be greater than 0");

const specificationMaterial = createValidStringField({ fieldName: "material" });
const specificationFinish = createValidStringField({ fieldName: "finish" });

const specificationsWidth = createPostiveNumberField({
  fieldName: "specification width",
  multipleOf: 0.01,
});

const specificationsDepth = createPostiveNumberField({
  fieldName: "specification depth",
  multipleOf: 0.01,
});

const specificationsHeight = createPostiveNumberField({
  fieldName: "specification height",
  multipleOf: 0.01,
});

const weightCapacityField = createPostiveNumberField({
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
    weightCapacity: weightCapacityField,
  })
  .optional();
