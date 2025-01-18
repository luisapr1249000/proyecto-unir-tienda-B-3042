import { ChangeEvent, useState } from "react";
import { ProductId } from "../../../types/product";
import LoadSpinner from "../../common/load-spinner/LoadSpinner";
import ObjectNotFound from "../../common/object-not-found/ObjectNotFound";
import Grid from "@mui/material/Grid2";
import { useGetReviewsFromProductWithPagination } from "../../../hooks/review.hooks";
// import ReviewItem from "../../reviews/review-item/ReviewItem";
import PaginationButtons from "../../common/pagination-buttons/PaginationButtons";

const ProductItemReviews = ({ productId }: ProductId) => {
  const {
    data,
    refetch,
    isLoading: isLoadingReviews,
    error: reviewError,
    isFetching,
  } = useGetReviewsFromProductWithPagination({ productId });

  const [page, setPage] = useState(1);

  const onChangePage = (_e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoadingReviews) return <LoadSpinner />;
  if (reviewError || !data)
    return <ObjectNotFound onReload={refetch} object="Comment" multiple />;

  return (
    <Grid>
      {/* {data.docs.map((review) => (
        <ReviewItem review={review} key={review._id} />
      ))} */}
      <PaginationButtons
        handleChange={onChangePage}
        page={page}
        isLoadingNextPage={isFetching}
        count={data.totalPages}
      />
    </Grid>
  );
};

export default ProductItemReviews;
