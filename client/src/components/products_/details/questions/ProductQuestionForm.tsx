import { useFormik } from "formik";
import React from "react";
import Grid from "@mui/material/Grid2";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productQuestionInputSchema } from "../../../../validation-schemas/product-schemas/productQuestions.validation";
import SubmitButton from "../../../common/buttons/submit-button/SubmitButton";
import TextField from "../../../common/textfields/TextField";

const ProductQuestionForm = () => {
  const initialValues = {
    content: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(productQuestionInputSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Grid container spacing={2} component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="User Question Content"
          name="content"
          placeholder="Ask anything"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={
            formik.touched.content && formik.errors.content
              ? formik.errors.content
              : undefined
          }
          fullWidth
          hasError={formik.touched.content && Boolean(formik.errors.content)}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubmitButton fullWidth isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default ProductQuestionForm;
