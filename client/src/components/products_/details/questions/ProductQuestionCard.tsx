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
import ProductAnswerForm from "./ProductAnswerForm";
import ProductQuestionUpdateForm from "./ProductQuestionUpdateForm";

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
