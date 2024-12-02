import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import React from "react";

const ProductQuestionCard = ({
  question,
  isAnswer,
  answer,
}: {
  question: string;
  isAnswer: boolean;
  answer: string;
}) => (
  <Card variant="outlined">
    <CardContent container spacing={1} component={Grid} direction="column">
      <Typography variant="body2">{question}</Typography>
      {isAnswer && (
        <Grid
          container
          spacing={0}
          sx={{
            alignItems: "center",
          }}
        >
          <SubdirectoryArrowRightIcon
            sx={{ mr: 1 }}
            fontSize="small"
            color="disabled"
          />
          <Typography sx={{}} variant="body2" color="textSecondary">
            {answer}
          </Typography>
        </Grid>
      )}
    </CardContent>
  </Card>
);

export default ProductQuestionCard;
