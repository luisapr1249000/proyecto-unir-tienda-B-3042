import { useFormik } from "formik";
import Grid from "@mui/material/Grid2";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productAnswerInputSchema } from "../../../../validation-schemas/product-schemas/productQuestions.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { answerUserQuestionForOneProduct } from "../../../../api/products/productQuestions.api";
import { toast } from "react-toastify";
import CircleLoadingGrid from "../../../common/loaders/CircleLoadingGrid";
import TextField from "../../../common/textfields/TextField";
import SubmitButton from "../../../common/buttons/submit-button/SubmitButton";
import CancelButton from "../../../common/buttons/cancel-button/CancelButton";

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
      toast.error("Error creating User Question!");
    },
  });

  const initialValues = {
    answer: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(productAnswerInputSchema),
    onSubmit: ({ answer }, { resetForm }) => {
      answerQuestionMutation({ answer, productId, userQuestionId: questionId });
      resetForm();
    },
  });
  const handleCancel = () => {
    formik.resetForm();
  };

  if (isPending) return <CircleLoadingGrid />;
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
          <SubmitButton isValid={true} />
          <CancelButton onCancel={handleCancel} />
        </Grid>
      )}
    </Grid>
  );
};

export default ProductAnswerForm;
