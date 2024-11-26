import React from "react";
import {
  ProductId,
  ProductProp,
  ProductQuestionContent,
} from "../../../types/product";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productUserQuestionSchema } from "../../../validation-schemas/product.validation";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUserQuestionForOneProduct } from "../../../api/product.api";

const ProductAskQuestionForm = ({ productId }: ProductId) => {
  const { mutate } = useMutation({
    mutationFn: createUserQuestionForOneProduct,
    onSuccess: () => toast.success("Question Created!"),
    onError: () => toast.error("Error creating the question"),
  });
  const initialValues = { questionContent: "" };
  const formik = useFormik<ProductQuestionContent>({
    initialValues,
    validationSchema: toFormikValidationSchema(productUserQuestionSchema),
    onSubmit: ({ questionContent }) => mutate({ productId, questionContent }),
  });

  return (
    <Grid spacing={1} container component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          id="questionContent"
          name="questionContent"
          label="Question Content"
          placeholder="Question Content"
          value={formik.values.questionContent}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.questionContent &&
            Boolean(formik.errors.questionContent)
          }
          helperText={
            formik.touched.questionContent &&
            Boolean(formik.errors.questionContent)
              ? formik.errors.questionContent
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.questionContent &&
            Boolean(!formik.errors.questionContent)
              ? true
              : undefined
          }
          color={
            formik.touched.questionContent &&
            Boolean(!formik.errors.questionContent)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubmitButton isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default ProductAskQuestionForm;
