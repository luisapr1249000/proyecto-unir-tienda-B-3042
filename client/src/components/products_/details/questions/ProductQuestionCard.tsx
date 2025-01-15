import { Card, CardContent, Typography } from "@mui/material";
import { ProductQuestion } from "../../../../types/product";

const ProductQuestionCard = ({ question }: { question: ProductQuestion }) => {
  console.log(question);
  return (
    <Card sx={{ border: 1, height: 100, width: 0 }}>
      <CardContent>
        <Typography>Username</Typography>
        <Typography>{question.user.username}</Typography>
      </CardContent>
      <CardContent>
        <Typography>Content</Typography>
        <Typography>{question.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductQuestionCard;
