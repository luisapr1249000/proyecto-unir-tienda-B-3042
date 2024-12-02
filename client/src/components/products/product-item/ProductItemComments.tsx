import React from "react";
import { ProductId } from "../../../types/product";
import { useInfiniteGetCommentsFromPost } from "../../../hooks/comments.hooks";
import LoadSpinner from "../../common/load-spinner/LoadSpinner";
import ObjectNotFound from "../../common/object-not-found/ObjectNotFound";
import CommentItem from "../../comments/comment-item/CommentItem";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";

const ProductItemComments = ({ productId }: ProductId) => {
  const {
    data,
    refetch,
    isLoading: isLoadingComments,
    error: commentError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteGetCommentsFromPost({ productId });

  if (isLoadingComments) return <LoadSpinner />;
  if (commentError || !data)
    return <ObjectNotFound onReload={refetch} object="Comment" multiple />;

  const comments = data.pages.map((comments) =>
    comments.docs.map((comment) => (
      <CommentItem comment={comment} key={comment._id} />
    ))
  );
  return (
    <Grid>
      {comments}
      {hasNextPage && !isFetchingNextPage && (
        <Button variant="text" color="primary" onClick={() => fetchNextPage}>
          See more comments
        </Button>
      )}
    </Grid>
  );
};

export default ProductItemComments;
