import React from "react";
import {
  ProductId,
  ProductProp,
  ProductQuestionContent,
  ProductUserQuestionId,
} from "../../../types/product";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productUserQuestionSchema } from "../../../validation-schemas/product-schemas/product.validation";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUserQuestionForOneProduct } from "../../../api/product.api";

const ProductUpdateQuestion = ({
  productId,
  userQuestionId,
  questionContent,
}: ProductId & ProductUserQuestionId & ProductQuestionContent) => {
  const { mutate } = useMutation({
    mutationFn: updateUserQuestionForOneProduct,
    onSuccess: () => toast.success("Question Updated!"),
    onError: () => toast.error("Error creating the question"),
  });
  const initialValues = { questionContent: questionContent };
  const formik = useFormik<ProductQuestionContent>({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(productUserQuestionSchema),
    onSubmit: ({ questionContent }) =>
      mutate({ productId, questionContent, userQuestionId: userQuestionId }),
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

export default ProductUpdateQuestion;
