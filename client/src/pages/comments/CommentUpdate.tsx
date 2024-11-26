import React from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../assets/css/mui-css-objects/gridCenter";
import { Card } from "@mui/material";

import { useParams } from "react-router-dom";
import { useGetProductById } from "../../hooks/products.hooks";
import LoadSpinner from "../../components/common/load-spinner/LoadSpinner";
import ObjectNotFound from "../../components/common/object-not-found/ObjectNotFound";
import CommentUpdateForm from "../../components/comments/comment-update/CommentUpdateForm";
import { useGetCommentById } from "../../hooks/comments.hooks";

const CommentUpdate = () => {
  const { productId, commentId } = useParams();
  const {
    data: product,
    isLoading: isLoadingProduct,
    error: productError,
    refetch,
  } = useGetProductById({ productId: productId ?? "" });

  const {
    data: comment,
    isLoading: isLoadingComment,
    error: commentError,
  } = useGetCommentById({
    commentId: commentId ?? "",
    productId: productId ?? "",
  });
  if (isLoadingProduct || isLoadingComment) return <LoadSpinner isBackdrop />;
  if (productError || !product || !comment || commentError)
    return <ObjectNotFound object="Product" onReload={refetch} />;

  return (
    <Grid sx={{ ...gridContainerCenter }}>
      <Grid component={Card} variant="outlined">
        <CommentUpdateForm comment={comment} productId={product._id} />
      </Grid>
    </Grid>
  );
};

export default CommentUpdate;
