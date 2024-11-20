import React from "react";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { CategoryInput } from "../../../types/category";
import { categoryInputSchema } from "../../../validation-schemas/category.validation";
import { TextField } from "@mui/material";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";

const CategoryCreateForm = () => {
  const initialValues = {
    name: "",
    description: "",
  } as CategoryInput;
  const formik = useFormik<CategoryInput>({
    initialValues,
    validationSchema: toFormikValidationSchema(categoryInputSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Grid spacing={2} container component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          name="name"
          label="Name"
          placeholder="Category Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={
            formik.touched.name && Boolean(formik.errors.name)
              ? formik.errors.name
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.name && Boolean(!formik.errors.name)
              ? true
              : undefined
          }
          color={
            formik.touched.name && Boolean(!formik.errors.name)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          multiline
          rows={5}
          name="description"
          label="Description (Optional)"
          placeholder="Category Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={
            formik.touched.description && Boolean(formik.errors.description)
              ? formik.errors.description
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.description && Boolean(!formik.errors.description)
              ? true
              : undefined
          }
          color={
            formik.touched.description && Boolean(!formik.errors.description)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubmitButton isValid={formik.isValid} fullWidth />
      </Grid>
    </Grid>
  );
};

export default CategoryCreateForm;