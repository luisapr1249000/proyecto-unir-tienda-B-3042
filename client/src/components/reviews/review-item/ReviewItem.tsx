import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import { ReviewProps } from "../../../types/review";

const ReviewItem = ({ review }: ReviewProps) => {
  return (
    <Card>
      <CardHeader />
      <CardContent>
        <Typography>{review.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
