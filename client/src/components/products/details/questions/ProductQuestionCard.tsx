import { Avatar, Card, CardContent, Divider, Typography } from "@mui/material";
import { ProductId, ProductQuestion } from "../../../../types/product";
import ProductAnswerForm from "./forms/ProductAnswerForm";
import Grid from "@mui/material/Grid2";
import QuestionContent from "./question-card/QuestionContent";

const ProductQuestionCard = ({
  productId,
  question,
  isAuthor = false,
}: { question: ProductQuestion; isAuthor?: boolean } & ProductId) => {
  return (
    <Card>
      <CardContent
        component={Grid}
        container
        spacing={1}
        sx={{ alignItems: "center" }}
      >
        <Avatar
          sx={{ width: 30, height: 30 }}
          src={question.user.avatar?.url}
        />
        <Typography variant="body2">{question.user.username}</Typography>
      </CardContent>
      <Divider />
      <QuestionContent productId={productId} question={question} />
      {isAuthor && (
        <>
          <Divider />

          <CardContent>
            <ProductAnswerForm
              productId={productId}
              questionId={question._id}
            />
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default ProductQuestionCard;
