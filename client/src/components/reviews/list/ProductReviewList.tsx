import React from "react";
import { useGetReviewsFromProductWithPagination } from "../../../hooks/review.hooks";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import ReviewCard from "../card/ReviewCard";
import CircleLoadingGrid from "../../common/loaders/CircleLoadingGrid";
import ObjectNotFound from "../../common/errors/object-not-found/ObjectNotFound";

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

  // if (isLoading) return <CircleLoadingGrid />;
  // if (error)
  //   return <ObjectNotFound multiple object="Review" onReload={refetch} />;
  // if (!data)
  //   return <ObjectNotFound multiple object="Review" onReload={refetch} />;

  return (
    <Grid container spacing={2} size={{ xs: 12, md: 11 }} sx={{}}>
      <Card variant="outlined" sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            Reviews
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          {isLoading ? (
            <CircleLoadingGrid />
          ) : !data || error ? (
            <ObjectNotFound multiple object="Review" onReload={refetch} />
          ) : data?.docs.length > 0 ? (
            data.docs.map((review, index) => (
              <Grid key={index}>
                <ReviewCard review={review} />
              </Grid>
            ))
          ) : (
            <NoReviews />
          )}
          {/* {!data || error ? (
            <ObjectNotFound multiple object="Review" onReload={refetch} />
          ) : data?.docs.length > 0 ? (
            data.docs.map((review, index) => (
              <Grid key={index}>
                <ReviewCard review={review} />
              </Grid>
            ))
          ) : (
            <NoReviews />
          )} */}
          {/* {
            !data || error ? (
              <ObjectNotFound multiple object="Review" onReload={refetch} />
            ):    {data?.docs.length > 0 ? (
              data.docs.map((review, index) => (
                <Grid key={index}>
                  <ReviewCard review={review} />
                </Grid>
              ))
            ) : (
              <NoReviews />
            )}
          } */}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductReviewList;
