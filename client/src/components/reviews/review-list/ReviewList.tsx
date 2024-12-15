import React from "react";
import { Review, ReviewProps } from "../../../types/review";
import Grid from "@mui/material/Grid2";
import ReviewItem from "../review-item/ReviewItem";

const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <Grid container size={{ xs: 12 }}>
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </Grid>
  );
};

export default ReviewList;
