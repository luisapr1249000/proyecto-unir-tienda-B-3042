import React from "react";
import { ProductProp } from "../../../types/product";
import { Card, CardContent, Typography } from "@mui/material";
import ProductQuestionCard from "./ProductQuestionCard";

const ProductQuesionSection = ({ product }: ProductProp) => {
  return (
    <CardContent>
      {product.userQuestions && product.userQuestions.length > 0 ? (
        <>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Last Questions Made
          </Typography>
          {product.userQuestions.map((question) => (
            <ProductQuestionCard
              key={question._id}
              question={question.questionContent}
              isAnswer={question.isAnswered}
              answer={question.answerContent}
            />
          ))}
        </>
      ) : (
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="body2">
              No Questions Made
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Be The First One To Ask A Question!
            </Typography>
          </CardContent>
        </Card>
      )}
    </CardContent>
  );
};

export default ProductQuesionSection;
