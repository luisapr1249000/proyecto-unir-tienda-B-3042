import { useFormik } from "formik";
import Grid from "@mui/material/Grid2";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUserQuestionForOneProduct } from "../../../../../api/products/productQuestions.api";
import { productQuestionInputSchema } from "../../../../../validation-schemas/product-schemas/productQuestions.validation";
import ContainerCircleLoader from "../../../../common/loaders/ContainerCircleLoader";
import TextField from "../../../../common/textfields/TextField";
import SubmitButton from "../../../../common/buttons/submit-button/SubmitButton";
import { ProductId } from "../../../../../types/product";

const ProductQuestionForm = ({ productId }: ProductId) => {
  const queryClient = useQueryClient();
  const { mutate: createUserQuestionMutation, isPending } = useMutation({
    mutationFn: createUserQuestionForOneProduct,
    onSuccess: () => {
      toast.success("User Question Created!");
      queryClient.invalidateQueries({ queryKey: [`product-${productId}`] });
    },
    onError: () => {
      toast.error("Error creating User Question!");
    },
  });

  const initialValues = {
    content: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(productQuestionInputSchema),
    onSubmit: ({ content }, { resetForm }) => {
      createUserQuestionMutation(
        { content, productId },
        { onSuccess: () => resetForm() }
      );
    },
  });
  if (isPending) return <ContainerCircleLoader />;
  return (
    <Grid container spacing={2} component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="User Question Content"
          name="content"
          placeholder="Ask anything"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={
            formik.touched.content && formik.errors.content
              ? formik.errors.content
              : undefined
          }
          fullWidth
          hasError={formik.touched.content && Boolean(formik.errors.content)}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubmitButton fullWidth isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default ProductQuestionForm;
