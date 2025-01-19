import React from "react";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { ProductId } from "../../../types/product";
import { useGetProductById } from "../../../hooks/products.hooks";
import ProductDetailsCard from "../../../components/products_/details/ProductDetails";
import ProductQuestions from "../../../components/products_/details/questions/ProductQuestions";
import ProductSpecificationts from "../../../components/products_/details/specifications/ProductSpecificationts";
import ProductReviewList from "../../../components/reviews/list/ProductReviewList";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import SkeletonProductDetail from "../../../components/common/skeleton/SkeletonProductDetail";

const ProductDetails = () => {
  const { productId } = useParams() as ProductId;
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductById({ productId });

  if (isLoading) return <SkeletonProductDetail />;
  if (error) return <ObjectNotFound onReload={refetch} object="Product" />;
  if (!product) return <ObjectNotFound onReload={refetch} object="Product" />;

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        py: 5,
        border: 1,
        bgcolor: "divider",
      }}
      spacing={3}
    >
      <ProductDetailsCard product={product} />
      <ProductSpecificationts product={product} />
      <ProductQuestions
        productId={product._id}
        questions={product.productQuestions ?? []}
      />
      <ProductReviewList productId={product._id} />
    </Grid>
  );
};

export default ProductDetails;
