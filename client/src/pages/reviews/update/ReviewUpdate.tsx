import Grid from "@mui/material/Grid2";
import { Card } from "@mui/material";

import { useParams } from "react-router-dom";
import ReviewUpdateHelmet from "./ReviewUpdateHelmet";
import BackdropLoading from "../../../components/common/loaders/BackdropLoading";
import { useGetProductById } from "../../../hooks/products.hooks";
import { GridObjectNotFound } from "../../../components/common/errors/object-not-found/ObjectNotFound";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import ReviewUpdateForm from "../../../components/reviews/update/ReviewUpdateForm";
import { useGetReviewById } from "../../../hooks/review.hooks";

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
  if (isLoadingProduct || isLoadingReview) return <BackdropLoading />;
  if (!product || !review)
    return <GridObjectNotFound object="Product" onReload={refetch} />;
  if (productError || !product || !review || reviewError)
    return <GridObjectNotFound object="Product" onReload={refetch} />;

  return (
    <>
      <ReviewUpdateHelmet />
      <Grid sx={{ ...gridContainerCenter }}>
        <Grid component={Card} variant="outlined">
          <ReviewUpdateForm review={review} productId={product._id} />
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewUpdate;
