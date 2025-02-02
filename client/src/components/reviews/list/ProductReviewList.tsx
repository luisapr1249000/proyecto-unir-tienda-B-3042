import React from "react";
import { useGetReviewsWithPagination } from "../../../hooks/review.hooks";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import ReviewCard from "../card/ReviewCard";
import CircleLoadingGrid from "../../common/loaders/CircleLoadingGrid";
import { ObjectNotFoundCard } from "../../common/errors/object-not-found/ObjectNotFound";
import { GridBorderRadious } from "../../../assets/css/mui-css-objects/grid";
import ErrorIcon from "@mui/icons-material/Error";

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
  const { data, isLoading, error, refetch } = useGetReviewsWithPagination({
    productId,
  });

  return (
    <Card
      elevation={4}
      component={Grid}
      sx={{ flexGrow: 1, ...GridBorderRadious }}
      spacing={3}
      size={{ xs: 12, md: 11 }}
    >
      <CardContent sx={{ bgcolor: "action.hover" }}>
        <Typography variant="h6" color="textSecondary">
          Reviews
        </Typography>
      </CardContent>
      <Divider />
      <CardContent
        component={Grid}
        container
        spacing={3}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {isLoading ? (
          <CircleLoadingGrid />
        ) : !data || error ? (
          <ObjectNotFoundCard
            multiple
            object="Review"
            onReload={refetch}
            message="Try searching for something else"
            icon={<ErrorIcon fontSize="large" />}
          />
        ) : data?.docs.length > 0 ? (
          data.docs.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <NoReviews />
        )}
      </CardContent>
    </Card>
  );
};

export default ProductReviewList;
