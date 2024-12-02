import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { searchProductsWithPagination } from "../../../api/product.api";
import GridLoadingSkeleton from "../../../components/common/load-spinner/GridLoadingSkeleton";
import ObjectNotFound from "../../../components/common/object-not-found/ObjectNotFound";
import ProductCard from "../../../components/products/product-card/product-card/ProductCard";
const ProductsSearchResults = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("-createdAt");

  const queryClient = useQueryClient();
  const { searchProduct } = useParams();
  const {
    data: products,
    error,
    isLoading,
    refetch,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products-search", searchProduct, page],
    queryFn: () =>
      searchProductsWithPagination(searchProduct ?? "", { page, sort }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <GridLoadingSkeleton />;
  if (error)
    return <ObjectNotFound object="Product" multiple onReload={refetch} />;
  if (!products)
    return <ObjectNotFound object="Product" multiple onReload={refetch} />;

  useEffect(() => {
    if (products && !isPlaceholderData && !products.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["products-search", searchProduct, page],
        queryFn: () =>
          searchProductsWithPagination(searchProduct ?? "", { page, sort }),
      });
    }
  }, [page, queryClient, products, isPlaceholderData, sort]);
  return (
    <Grid sx={{ ...gridContainerCenter }}>
      <Grid>
        {products.docs.map((product) => (
          <ProductCard product={product} />
        ))}
      </Grid>
    </Grid>
  );
};

export default ProductsSearchResults;
