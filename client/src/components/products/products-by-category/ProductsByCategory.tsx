import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
// import { getProductsByCategoryByIdWithPagination } from "../../../api/products/product.api";
import { Category } from "../../../types/category";
// import PaginationButtons from "../../common/pagination-buttons/PaginationButtons";
// import { Box, Divider } from "@mui/material";
// import SortToggleButtons from "../../common/buttons/sort-toggle-buttons/SortToggleButtons";
// import ProductResultOverviewInfo from "../ProductResultOverViewinfo/ProductResultOverviewInfo";
import Grid from "@mui/material/Grid2";
import ProductCard from "../product-card/product-card/ProductCard";
import GridLoadingSkeleton from "../../common/load-spinner/GridLoadingSkeleton";
import ObjectNotFound from "../../common/object-not-found/ObjectNotFound";

const ProductsByCategory = ({ category }: { category: Category }) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("-createdAt");
  const queryKeyValue = ["product-category", category.name, page, sort];
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingProducts,
    data: products,
    isPlaceholderData,
    error: errorProducts,
    isFetching: isFetchingProducts,
    refetch,
  } = useQuery({
    queryKey: queryKeyValue,
    queryFn: () =>
      getProductsByCategoryByIdWithPagination({
        categoryId: category._id,
        page: page,
      }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (
      products &&
      category &&
      !isPlaceholderData &&
      products.hasNextPage &&
      sort
    ) {
      queryClient.prefetchQuery({
        queryKey: queryKeyValue,
        queryFn: () =>
          getProductsByCategoryByIdWithPagination({
            categoryId: category._id,
            page: page,
            sort: sort,
          }),
      });
    }
  }, [page, queryClient, products, category, isPlaceholderData, sort]);

  const handlePaginationChange = (
    _e: React.ChangeEvent<unknown>,
    value: number
  ) => setPage(value);

  const handleChangeSort = (sortValues: string) => {
    setSort(sortValues);
  };

  if (isLoadingProducts) return <GridLoadingSkeleton />;
  if (isFetchingProducts) return <GridLoadingSkeleton />;
  if (errorProducts)
    return <ObjectNotFound object="Product" onReload={refetch} />;
  if (!products) return <ObjectNotFound object="Product" onReload={refetch} />;
  const startResult = (products.page - 1) * 10 + 1;
  const endResultPerPage = !products.hasNextPage
    ? products.totalDocs
    : products.page * 10;
  return (
    <Grid spacing={3} container size={{ xs: 12 }} sx={{ p: 3 }}>
      <Grid
        container
        size={{ xs: 12 }}
        sx={{
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <ProductResultOverviewInfo
          endResultPerPage={endResultPerPage}
          startResult={startResult}
          totalDocs={products.totalDocs}
        />

        <Grid size={{ xs: 6, md: 3 }}>
          <SortToggleButtons sortValue={sort} handleChange={handleChangeSort} />
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} container>
        <Divider sx={{ flexGrow: 1 }} />
      </Grid>
      <Grid container>
        {products.docs.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Divider sx={{ flexGrow: 1 }} />
      </Grid>
      <PaginationButtons
        count={products?.totalPages}
        handleChange={handlePaginationChange}
        page={page}
        isLoadingNextPage={isFetchingProducts}
      />
    </Grid>
  );
};

export default ProductsByCategory;
