import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TextField } from "@mui/material";
import { ProductId } from "../../../types/product";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import ButtonInputFile from "../../common/buttons/button-input-file/ButtonInputFile";
import { reviewInputSchema } from "../../../validation-schemas/review.validation";
import ReviewRatingField from "./ReviewRatingField";
import ReviewUploadImages from "./ReviewUploadImages";

const ReviewCreateForm = ({ productId }: ProductId) => {
  const initialValues = {
    content: "",
    review: 1,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(reviewInputSchema),
    onSubmit: (values) => console.log(values, productId),
  });

  const onChangeRating = (newValue: number | null) => {
    formik.setFieldValue("review", newValue);
  };

  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <ReviewRatingField
        onChangeRating={onChangeRating}
        value={formik.values.review}
      />
      <Grid size={{ xs: 12 }}>
        <TextField
          multiline
          rows={4}
          fullWidth
          required
          id="content"
          name="content"
          label="Review Content"
          placeholder="Review Content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={
            formik.touched.content && Boolean(formik.errors.content)
              ? formik.errors.content
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.content && Boolean(!formik.errors.content)
              ? true
              : undefined
          }
          color={
            formik.touched.content && Boolean(!formik.errors.content)
              ? "success"
              : undefined
          }
        />
      </Grid>

      <ReviewUploadImages />
      <Grid size={{ xs: 12 }}>
        <SubmitButton isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default ReviewCreateForm;
