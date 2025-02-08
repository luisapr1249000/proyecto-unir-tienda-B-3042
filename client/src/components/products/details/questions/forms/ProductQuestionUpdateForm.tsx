import { useFormik } from "formik";
import Grid from "@mui/material/Grid2";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productQuestionInputSchema } from "../../../../../validation-schemas/product-schemas/productQuestions.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserQuestionForOneProduct } from "../../../../../api/products/productQuestions.api";
import { toast } from "react-toastify";
import TextField from "../../../../common/textfields/TextField";
import SubmitButton from "../../../../common/buttons/submit-button/SubmitButton";
import ContainerCircleLoader from "../../../../common/loaders/ContainerCircleLoader";
import ClearButton from "../../../../common/buttons/clear-button/ClearButton";

const ProductQuestionUpdateForm = ({
  onCancel,
  content,
  productId,
  questionId,
}: {
  onCancel: () => void;
  content: string;
  productId: string;
  questionId: string;
}) => {
  const queryClient = useQueryClient();
  const { mutate: updateQuestionMutation, isPending } = useMutation({
    mutationFn: updateUserQuestionForOneProduct,
    onSuccess: () => {
      toast.success("User Question Created!");
      queryClient.invalidateQueries({ queryKey: [`product-${productId}`] });
    },
    onError: () => {
      toast.error("Error creating User Question!");
    },
  });

  const initialValues = {
    content,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(productQuestionInputSchema),
    onSubmit: ({ content }, { resetForm }) => {
      console.log(content);
      updateQuestionMutation({
        content,
        productId,
        userQuestionId: questionId,
      });
      resetForm();
      onCancel();
    },
  });
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
          label="User Question Content"
          name="content"
          placeholder="Ask anything"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={false}
          helperText={undefined}
          fullWidth
          hasError={false}
          size="small"
        />
      </Grid>
      <Grid container spacing={1} size={{ xs: 12 }}>
        <SubmitButton isValid={true} />
        <ClearButton onClick={onCancel} />
      </Grid>
    </Grid>
  );
};

export default ProductQuestionUpdateForm;
