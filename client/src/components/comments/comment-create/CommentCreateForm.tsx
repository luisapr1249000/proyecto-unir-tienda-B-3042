import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { CommentInput } from "../../../types/comment";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { commentInputSchema } from "../../../validation-schemas/comment.validation";
import { TextField } from "@mui/material";
import CommentRatingField from "./CommentRatingField";
import { ProductId } from "../../../types/product";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import ButtonInputFile from "../../common/buttons/button-input-file/ButtonInputFile";
import { toast } from "react-toastify";
import DisplayImagePreview from "../../common/display-image-preview/DisplayImagePreview";

const CommentCreateForm = ({ productId }: ProductId) => {
  const initialValues = {
    content: "",
    review: 1,
    images: [] as File[],
  } as CommentInput;
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(commentInputSchema),
    onSubmit: (values) => console.log(values, productId),
  });

  const onChangeRating = (newValue: number | null) => {
    formik.setFieldValue("review", newValue);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 5;
    const newFiles = e.currentTarget.files;

    if (!newFiles) return;

    const selectedFiles = Array.from(newFiles);
    const totalFiles = [...formik.values.images, ...selectedFiles];

    if (totalFiles.length > maxLength) {
      const allowedFiles = selectedFiles.slice(
        0,
        maxLength - formik.values.images.length
      );
      toast.error("You can only upload up to 5 images.");
      formik.setFieldValue("images", [
        ...formik.values.images,
        ...allowedFiles,
      ]);
    } else {
      formik.setFieldValue("images", totalFiles);
    }
  };

  const handleRemoveFile = (fileIndex: number) => {
    const prevFiles = formik.values.images.filter((_, i) => i !== fileIndex);
    formik.setFieldValue("images", prevFiles);
  };

  console.log(formik.values.images);
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
      <Grid container size={{ xs: 12 }}>
        <ButtonInputFile onChange={onChangeFile} multiple />
      </Grid>
      {formik.values.images.length > 0 &&
        formik.values.images.map((image, i) => (
          <DisplayImagePreview
            key={i}
            files={[image] as File[]}
            onDeleteFile={() => handleRemoveFile(i)}
          />
        ))}
      <Grid size={{ xs: 12 }}>
        <SubmitButton isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default CommentCreateForm;
