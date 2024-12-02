import React from "react";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { useGetProductById } from "../../../hooks/products.hooks";
import { ProductId } from "../../../types/product";
import LoadSpinner from "../../../components/common/load-spinner/LoadSpinner";
import ProductItemCard from "../../../components/products/product-item/product-item-card/ProductItemCard";
import ObjectNotFound from "../../../components/common/object-not-found/ObjectNotFound";
import ProductAskQuestionForm from "../../../components/products/product-questions/ProductAskQuestionForm";
import ProductQuesionSection from "../../../components/products/product-questions/ProductQuesionSection";
import ProductItemComments from "../../../components/products/product-item/ProductItemComments";
import ProductItemSkeleton from "../../../components/products/product-item/ProductItemSkeleton";

const ProductItem = () => {
  const { productId } = useParams() as ProductId;
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductById({ productId });

  if (isLoading) return <ProductItemSkeleton />;

  if (error || !product)
    return <ObjectNotFound onReload={refetch} object="Product" />;

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        pb: 10,
        pt: 10,
      }}
      spacing={3}
    >
      {product && (
        <>
          <ProductItemCard product={product} />
          <Grid
            component={Card}
            variant="outlined"
            size={{ xs: 10 }}
            // sx={{ height: 100 }}
          >
            <CardContent>
              <Typography variant="h5">Q&A</Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <ProductAskQuestionForm productId={product._id} />
            </CardContent>
            <Divider />
            <ProductQuesionSection product={product} />
          </Grid>
          <Card size={{ xs: 10 }} component={Grid} variant="outlined">
            <CardContent>
              <Typography>Comment & Reviews</Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <ProductItemComments productId={product._id} />
            </CardContent>
          </Card>
        </>
      )}
    </Grid>
  );
};

export default ProductItem;
