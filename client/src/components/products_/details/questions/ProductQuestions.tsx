import Grid from "@mui/material/Grid2";
import React from "react";
import { ProductId, ProductQuestion } from "../../../../types/product";
import ProductQuestionCard from "./ProductQuestionCard";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import ProductQuestionForm from "./ProductQuestionForm";

const NoQuestions = () => (
  <CardContent>
    <Typography variant="body2" color="textSecondary">
      No questions yet, Be the first to ask one!
    </Typography>
  </CardContent>
);

const ProductQuestions = ({
  productId,
  questions,
}: { questions: ProductQuestion[] } & ProductId) => {
  return (
    <Card
      component={Grid}
      // sx={{ border: 1, height: 400 }}
      size={{ xs: 11, md: 11 }}
      spacing={2}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Questions
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <ProductQuestionForm productId={productId} />
      </CardContent>
      <Divider />
      <CardContent component={Grid} container spacing={2}>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <Grid size={{ xs: 12 }}>
              <ProductQuestionCard
                productId={productId}
                key={index}
                question={question}
              />
            </Grid>
          ))
        ) : (
          <NoQuestions />
        )}
      </CardContent>
    </Card>
  );
};

export default ProductQuestions;
