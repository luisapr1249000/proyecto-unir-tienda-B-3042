import React from "react";
import {
  ProductId,
  ProductQuestionOptionaContentAnswer,
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
import { answerUserQuestionForOneProduct } from "../../../api/product.api";

const ProductAnswerQuestionForm = ({
  productId,
  userQuestionId,
  answerContent,
  isUpdating,
}: ProductId &
  ProductUserQuestionId &
  ProductQuestionOptionaContentAnswer & { isUpdating: boolean }) => {
  const { mutate } = useMutation({
    mutationFn: answerUserQuestionForOneProduct,
    onSuccess: () => toast.success("Question Updated!"),
    onError: () => toast.error("Error creating the question"),
  });
  const initialValues = { answerContent: isUpdating ? answerContent : "" };
  const formik = useFormik<ProductQuestionOptionaContentAnswer>({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(productUserQuestionSchema),
    onSubmit: ({ answerContent }) =>
      mutate({
        productId,
        answerContent: answerContent ?? "",
        userQuestionId: userQuestionId,
      }),
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
          value={formik.values.answerContent}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.answerContent && Boolean(formik.errors.answerContent)
          }
          helperText={
            formik.touched.answerContent && Boolean(formik.errors.answerContent)
              ? formik.errors.answerContent
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.answerContent &&
            Boolean(!formik.errors.answerContent)
              ? true
              : undefined
          }
          color={
            formik.touched.answerContent &&
            Boolean(!formik.errors.answerContent)
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
export default ProductAnswerQuestionForm;
