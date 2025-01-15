import React from "react";
import { useGetReviewsFromProductWithPagination } from "../../../hooks/review.hooks";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import ReviewCard from "../card/ReviewCard";

const NoReviews = () => (
  <Card>
    <CardContent>
      <Typography variant="body2" color="textSecondary">
        No reviews yet, Be the first to review!
      </Typography>
    </CardContent>
  </Card>
);

const ProductReviewList = ({ productId }: { productId: string }) => {
  const { data, isLoading, error, refetch } =
    useGetReviewsFromProductWithPagination({ productId });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  return (
    <Grid container spacing={2} size={{ xs: 11 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            Reviews
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          {data?.docs.length > 0 ? (
            data.docs.map((review, index) => (
              <Grid key={index}>
                <ReviewCard review={review} />
              </Grid>
            ))
          ) : (
            <NoReviews />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductReviewList;
