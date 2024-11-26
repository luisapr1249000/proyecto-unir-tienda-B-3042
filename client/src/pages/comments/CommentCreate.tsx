import React from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../assets/css/mui-css-objects/gridCenter";
import { Card } from "@mui/material";
import CommentCreateForm from "../../components/comments/comment-create/CommentCreateForm";
import { useGetProductById } from "../../hooks/products.hooks";
import { useParams } from "react-router-dom";
import LoadSpinner from "../../components/common/load-spinner/LoadSpinner";
import ObjectNotFound from "../../components/common/object-not-found/ObjectNotFound";
const CommentCreate = () => {
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
        <CommentCreateForm productId={product._id} />
      </Grid>
    </Grid>
  );
};

export default CommentCreate;
