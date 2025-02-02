import React from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../assets/css/mui-css-objects/gridCenter";
import { Card } from "@mui/material";

import { useParams } from "react-router-dom";
import { useGetProductById } from "../../hooks/products.hooks";
import LoadSpinner from "../../components/common/load-spinner/LoadSpinner";
import { useGetReviewById } from "../../hooks/review.hooks";
import ReviewUpdateForm from "../../components/reviews/update/ReviewUpdateForm";
import ObjectNotFound from "../../components/common/errors/object-not-found/ObjectNotFound";

const ReviewUpdate = () => {
  const { productId, reviewId } = useParams();
  const {
    data: product,
    isLoading: isLoadingProduct,
    error: productError,
    refetch,
  } = useGetProductById({ productId: productId ?? "" });

  const {
    data: review,
    isLoading: isLoadingReview,
    error: reviewError,
  } = useGetReviewById({
    reviewId: reviewId ?? "",
    productId: productId ?? "",
  });
  if (isLoadingProduct || isLoadingReview) return <LoadSpinner isBackdrop />;
  if (!product || !review)
    return <ObjectNotFound object="Product" onReload={refetch} />;
  if (productError || !product || !review || reviewError)
    return <ObjectNotFound object="Product" onReload={refetch} />;

  return (
    <Grid sx={{ ...gridContainerCenter }}>
      <Grid component={Card} variant="outlined">
        <ReviewUpdateForm review={review} productId={product._id} />
      </Grid>
    </Grid>
  );
};

export default ReviewUpdate;
