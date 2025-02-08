import { CardContent, Divider, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import { ProductId, ProductQuestion } from "../../../../../types/product";
import ProductQuestionUpdateForm from "../forms/ProductQuestionUpdateForm";
import { useState } from "react";
import AnswerContent from "./AnswerContent";
import { formatDate } from "../../../../../utils/util.dates";
import { useAuthUser } from "../../../../../hooks/auth";

const QuestionContent = ({
  productId,
  question,
}: { question: ProductQuestion } & ProductId) => {
  const [isUpdateQuestion, setIsUpdateQuestion] = useState(false);
  const handleCancelUpdateQuestion = () => setIsUpdateQuestion(false);
  const handleUpdateQuestion = () => setIsUpdateQuestion(true);

  const { data: authUser } = useAuthUser();
  const isQuestionAuthor = authUser && authUser._id === question.user._id;
  return (
    <>
      <CardContent component={Grid} container direction={"column"}>
        {isUpdateQuestion ? (
          <ProductQuestionUpdateForm
            productId={productId}
            questionId={question._id}
            onCancel={handleCancelUpdateQuestion}
            content={question.content}
          />
        ) : (
          <Grid
            container
            spacing={1}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="body2" color="textSecondary">
              {question.content}
            </Typography>
            {isQuestionAuthor && (
              <IconButton
                onClick={handleUpdateQuestion}
                size="small"
                color="primary"
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            )}
          </Grid>
        )}

        {question.isAnswered && <AnswerContent answer={question.answer} />}
      </CardContent>
      {question.isAnswered && (
        <>
          <Divider />
          <CardContent>
            <Typography variant="caption" color="textSecondary">
              Answered At: {formatDate(question.createdAt)}
            </Typography>
          </CardContent>
        </>
      )}
    </>
  );
};
export default QuestionContent;
