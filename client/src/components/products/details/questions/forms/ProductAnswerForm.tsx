import { useFormik } from "formik";
import Grid from "@mui/material/Grid2";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productAnswerInputSchema } from "../../../../../validation-schemas/product-schemas/productQuestions.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { answerUserQuestionForOneProduct } from "../../../../../api/products/productQuestions.api";
import { toast } from "react-toastify";
import TextField from "../../../../common/textfields/TextField";
import SubmitButton from "../../../../common/buttons/submit-button/SubmitButton";
import ContainerCircleLoader from "../../../../common/loaders/ContainerCircleLoader";
import ClearButton from "../../../../common/buttons/clear-button/ClearButton";

const ProductAnswerForm = ({
  productId,
  questionId,
}: {
  productId: string;
  questionId: string;
}) => {
  const queryClient = useQueryClient();
  const { mutate: answerQuestionMutation, isPending } = useMutation({
    mutationFn: answerUserQuestionForOneProduct,
    onSuccess: () => {
      toast.success("User Question Created!");
      queryClient.invalidateQueries({ queryKey: [`product-${productId}`] });
    },
    onError: () => {
      toast.error("Error Answering User Question!");
    },
  });

  const initialValues = {
    answer: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(productAnswerInputSchema),
    onSubmit: ({ answer }, { resetForm }) => {
      answerQuestionMutation(
        { answer, productId, userQuestionId: questionId },
        { onSuccess: () => resetForm() }
      );
    },
  });
  const handleCancel = () => {
    formik.resetForm();
  };

  if (isPending) return <ContainerCircleLoader />;
  return (
    <Grid
      sx={{ my: 2 }}
      container
      spacing={2}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Answer"
          name="answer"
          placeholder="Answer"
          value={formik.values.answer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={false}
          helperText={undefined}
          fullWidth
          hasError={false}
          size="small"
        />
      </Grid>
      {formik.values.answer.length > 0 && (
        <Grid container spacing={1} size={{ xs: 12 }}>
          <SubmitButton isValid={formik.isValid} />
          <ClearButton onClick={handleCancel} />
        </Grid>
      )}
    </Grid>
  );
};

export default ProductAnswerForm;
