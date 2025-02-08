import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { CategoryInput, CategoryProp } from "../../../types/category";
import { categoryInputSchema } from "../../../validation-schemas/category.validation";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import TextField from "../../common/textfields/TextField";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCategory } from "../../../api/category.api";
import { useNavigate } from "react-router-dom";
import ContainerCircleLoader from "../../common/loaders/ContainerCircleLoader";

const CategoryUpdateForm = ({ category }: CategoryProp) => {
  const navigate = useNavigate();
  const { mutate: updateCategoryMutation, isPending } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("Category updated successfully");
      navigate("/categories");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const initialValues = {
    name: category.name,
    description: category?.description,
  } as CategoryInput;
  const formik = useFormik<CategoryInput>({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(categoryInputSchema),
    onSubmit: (values) => {
      updateCategoryMutation({ categoryId: category._id, data: values });
    },
  });

  if (isPending) return <ContainerCircleLoader />;

  return (
    <Grid spacing={3} container component="form">
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
          hasError={formik.touched.name && Boolean(formik.errors.name)}
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

export default CategoryUpdateForm;
