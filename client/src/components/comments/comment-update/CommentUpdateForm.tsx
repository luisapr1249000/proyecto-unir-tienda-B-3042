import React from "react";
import { Comment } from "../../../types/comment";
import { ProductId } from "../../../types/product";
import Grid from "@mui/material/Grid2";
import { CommentInput } from "../../../types/comment";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { commentInputSchema } from "../../../validation-schemas/comment.validation";
import { TextField } from "@mui/material";
import CommentRatingField from "../comment-create/CommentRatingField";

const CommentUpdateForm = ({
  comment,
  productId,
}: { comment: Comment } & ProductId) => {
  const initialValues = {
    content: comment ? comment.content : "",
    review: comment ? comment.review : 1,
  } as CommentInput;
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(commentInputSchema),
    onSubmit: (values) => console.log(values, productId),
  });

  const onChangeRating = (newValue: number | null) => {
    formik.setFieldValue("review", newValue);
  };
  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <CommentRatingField
        onChangeRating={onChangeRating}
        value={formik.values.review}
      />
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          id="content"
          name="content"
          label="Comment Content"
          placeholder="Comment Content"
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

export default CommentUpdateForm;
