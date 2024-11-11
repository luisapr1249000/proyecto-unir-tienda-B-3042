import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import { useGetCategoryByName } from "../../../hooks/category";
import { useQuery } from "@tanstack/react-query";
import { getCategoryByName } from "../../../api/category.api";
import { useGetProductsByCategoryByIdWithPagination } from "../../../hooks/products.hooks";
import LoadSpinner from "../../../components/common/load-spinner/LoadSpinner";
import ProductCard from "../../../components/products/product-card/product-card/ProductCard";
import SkeletonCard from "../../../components/common/skeleton/SkeletonCard";

const ProductsCategory = () => {
  const { categoryName } = useParams() as { categoryName: string };

  const {
    data: existedCategory,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useGetCategoryByName({
    categoryName,
  });
  const {
    data: products,
    error: errorProducts,
    isLoading: isLoadingProducts,
  } = useGetProductsByCategoryByIdWithPagination({
    queryKey: [`product-category-${categoryName}`],
    categoryId: existedCategory?._id || "",
    enabled: Boolean(existedCategory?._id),
  });

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        border: 4,
        p: 4,
      }}
      spacing={5}
    >
      {isLoadingCategory &&
        [...Array(25).keys()].map((_, index) => <SkeletonCard key={index} />)}
      {isLoadingProducts && <LoadSpinner />}
      {errorCategory && <Typography>Category Not Found</Typography>}
      {errorProducts && <Typography>Products Not Found</Typography>}
      {products?.docs.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductsCategory;
