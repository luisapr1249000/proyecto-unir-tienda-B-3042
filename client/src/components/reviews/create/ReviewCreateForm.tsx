import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TextField } from "@mui/material";
import { ProductId } from "../../../types/product";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { reviewInputSchema } from "../../../validation-schemas/review.validation";
import ReviewRatingField from "./ReviewRatingField";
import ReviewAttachImages from "./ReviewAttachImages";
import { createReview } from "../../../api/review.api";
import { toast } from "react-toastify";
import CircleLoadingGrid from "../../common/loading/CircleLoadingGrid";

const ReviewCreateForm = ({ productId }: ProductId) => {
  const { mutate: createReviewMutation, isPending } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      console.log("success");
      toast.success("Review created successfully");
    },
    onError: () => {
      console.log("error");
      toast.error("Something went wrong");
    },
  });

  const initialValues = {
    content: "",
    review: 1,
    images: [],
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(reviewInputSchema),
    onSubmit: (values) => {
      createReviewMutation({
        values,
        productId,
      });
    },
  });

  const onChangeRating = (newValue: number | null) => {
    formik.setFieldValue("review", newValue);
  };

  const setImages = (files: File[]) => {
    formik.setFieldValue("images", files);
  };

  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      {isPending && <CircleLoadingGrid />}
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

      <ReviewAttachImages setImages={setImages} />
      <Grid size={{ xs: 12 }}>
        <SubmitButton isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default ReviewCreateForm;
