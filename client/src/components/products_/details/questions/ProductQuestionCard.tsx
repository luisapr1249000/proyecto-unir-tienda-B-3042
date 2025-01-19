import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { ProductId, ProductQuestion } from "../../../../types/product";
import EditIcon from "@mui/icons-material/Edit";
import { formatDate } from "../../../../utils/util.dates";
import { useState } from "react";
import TextField from "../../../common/textfields/TextField";
import SubmitButton from "../../../common/buttons/submit-button/SubmitButton";
import CancelButton from "../../../common/buttons/cancel-button/CancelButton";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  productAnswerInputSchema,
  productQuestionInputSchema,
} from "../../../../validation-schemas/product-schemas/productQuestions.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  answerUserQuestionForOneProduct,
  updateUserQuestionForOneProduct,
} from "../../../../api/products/productQuestions.api";
import { toast } from "react-toastify";
import CircleLoadingGrid from "../../../common/loaders/CircleLoadingGrid";

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
        <CancelButton onCancel={onCancel} />
      </Grid>
    </Grid>
  );
};

const ProductQuestionCard = ({
  productId,
  question,
}: { question: ProductQuestion } & ProductId) => {
  const [isUpdateQuestion, setIsUpdateQuestion] = useState(false);
  const handleCancelUpdateQuestion = () => setIsUpdateQuestion(false);

  const handleUpdateQuestion = () => setIsUpdateQuestion(true);
  return (
    <Card>
      <CardContent>
        <Typography variant="body2">{question.user.username}</Typography>
      </CardContent>
      <Divider />

      <CardContent component={Grid} container direction={"column"}>
        {isUpdateQuestion ? (
          <ProductQuestionUpdateForm
            productId={productId}
            questionId={question._id}
            onCancel={handleCancelUpdateQuestion}
            content={question.content}
          />
        ) : (
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="body2" color="textSecondary">
              {question.content}
            </Typography>
            <IconButton onClick={handleUpdateQuestion} size="small">
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        )}
        {question.answer && question.answer.length > 0 && (
          <Box component={Grid} container spacing={1}>
            <SubdirectoryArrowRightIcon fontSize="inherit" />
            <Typography variant="body2" color="textSecondary">
              {question.answer}
            </Typography>
          </Box>
        )}
      </CardContent>

      {question.isAnswered && (
        <>
          <Divider />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Answered:
            </Typography>
            <Typography variant="body2">
              {question.isAnswered ? "Yes" : "No"}
            </Typography>
          </CardContent>
        </>
      )}
      <Divider />
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Typography variant="caption" color="textSecondary">
          Created At: {formatDate(question.createdAt)}
        </Typography>
        {question.isAnswered && (
          <Typography variant="caption" color="textSecondary">
            Answered At: {formatDate(question.updatedAt)}
          </Typography>
        )}
      </CardActions>
      <Divider />
      <CardContent>
        <ProductAnswerForm productId={productId} questionId={question._id} />
      </CardContent>
    </Card>
  );
};

export default ProductQuestionCard;
