import React from "react";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { ProductId } from "../../../types/product";
import { useGetProductById } from "../../../hooks/products.hooks";
import ObjectNotFound from "../../../components/common/object-not-found/ObjectNotFound";
import ProductItemSkeleton from "../../../components/products/product-item/ProductItemSkeleton";
import ProductDetailsCard from "../../../components/products_/details/ProductDetails";
import ProductQuestions from "../../../components/products_/details/questions/ProductQuestions";
import ProductSpecificationts from "../../../components/products_/details/specifications/ProductSpecificationts";
import ProductReviewList from "../../../components/reviews/list/ProductReviewList";

const ProductDetails = () => {
  const { productId } = useParams() as ProductId;
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductById({ productId });

  if (isLoading) return <ProductItemSkeleton />;
  if (error) return <ObjectNotFound onReload={refetch} object="Product" />;
  if (!product) return <ObjectNotFound onReload={refetch} object="Product" />;

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        py: 5,
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
