import React from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../assets/css/mui-css-objects/gridCenter";
import { Card } from "@mui/material";
import { useGetProductById } from "../../hooks/products.hooks";
import { useParams } from "react-router-dom";
import LoadSpinner from "../../components/common/load-spinner/LoadSpinner";
import ObjectNotFound from "../../components/common/object-not-found/ObjectNotFound";
import ReviewCreateForm from "../../components/reviews/review-create/ReviewCreateForm";
const ReviewCreate = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductById({ productId: productId ?? "" });

  if (isLoading) return <LoadSpinner isBackdrop />;
  if (error || !product)
    return <ObjectNotFound object="Product" onReload={refetch} />;

  return (
    <Grid sx={{ ...gridContainerCenter }}>
      <Grid sx={{ p: 3 }} component={Card} variant="outlined">
        <ReviewCreateForm productId={product._id} />
      </Grid>
    </Grid>
  );
};

export default ReviewCreate;
