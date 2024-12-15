import React from "react";
import { ProductId } from "../../../types/product";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TextField } from "@mui/material";
import { Review } from "../../../types/review";
import { reviewInputSchema } from "../../../validation-schemas/review.validation";
import ReviewRatingField from "../review-create/ReviewRatingField";

const ReviewUpdateForm = ({
  review,
  productId,
}: { review: Review } & ProductId) => {
  const initialValues = {
    content: review ? review.content : "",
    review: review ? review.review : 1,
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
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
    </Grid>
  );
};

export default ReviewUpdateForm;
