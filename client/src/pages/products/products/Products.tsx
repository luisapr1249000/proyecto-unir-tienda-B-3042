import React, { useEffect, useState } from "react";
import {
  // useGetProductsWithPagination,
  useGetProductsWithPagination_,
} from "../../../hooks/products.hooks";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../../components/products_/card/ProductCard";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import QueryResultSummary from "../../../components/common/query/QueryResultSummary";
import SortSelecter from "../../../components/common/sort-and-pagination/SortSelecter";
import PaginationButtons from "../../../components/common/sort-and-pagination/PaginationButtons";
import { Paper, Divider, Card, CardActions, CardContent } from "@mui/material";
import PageLimitSetter from "../../../components/common/query/PageLimitSetter";
import SkeletonCardGrid from "../../../components/common/skeleton/SkeletonCardGrid";
import { useAuthUser } from "../../../hooks/auth";
import { useGetUserCart, useGetUserWishlist } from "../../../hooks/user";
import { useLocation } from "react-router-dom";

import usePriceStore from "../../../zustand/priceSlice";

const Products = () => {
  const location = useLocation();
  console.log("location ------>", location);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { data: authUser } = useAuthUser();
  // const { data: cartList } = useGetUserCart({ userId: authUser?._id ?? "" });
  const { data: wishlistList } = useGetUserWishlist({
    userId: authUser?._id ?? "",
    enabled: !!authUser,
  });

  const {
    data: products,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetProductsWithPagination_({
    isKeepPreviousData: true,
    page,
    limit,
    sort: sortBy,
    minPrice: usePriceStore.getState().price.min,
    maxPrice: usePriceStore.getState().price.max,
  });
  const handleChangeSort = (sort: string) => {
    setSortBy(sort);
    setPage(1);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  }, [page]);
  if (isLoading || isFetching)
    return (
      <SkeletonCardGrid
        sx={{ justifyContent: "center", alignItems: "center", py: 6 }}
      />
    );
  if (error)
    return <ObjectNotFound multiple onReload={refetch} object="Product" />;
  if (!products)
    return <ObjectNotFound multiple onReload={refetch} object="Product" />;

  return (
    <Grid
      container
      spacing={5}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Card elevation={4}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Grid
            container
            size="grow"
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            sx={{ justifyContent: "stretch" }}
          >
            <Paper
              elevation={6}
              size={{ xs: "grow" }}
              component={Grid}
              container
              sx={{
                // height: 1,
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                // border: 1,
              }}
            >
              <QueryResultSummary
                page={page}
                limit={limit}
                pagingCounter={products.pagingCounter}
                countPerPage={products.limit}
                sortBy="createdAt"
                sortDirection="asc"
                total={products.totalDocs}
                querySearch={`Products`}
              />
            </Paper>
            <Grid
              container
              sx={{ justifyContent: "center", alignItems: "center" }}
              size={{ xs: "grow" }}
            >
              <PageLimitSetter limit={limit} setLimit={setLimit} />
            </Grid>

            <Grid
              container
              size={{ xs: "grow" }}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <SortSelecter sortBy={sortBy} handleChange={handleChangeSort} />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />
        <CardContent sx={{ p: 6 }} component={Grid} container spacing={2}>
          {products.docs.map((product) => {
            const isWishlistItem = wishlistList?.wishlist
              .map((p) => p._id)
              .includes(product._id);
            console.log("isWishlistItem", isWishlistItem);
            return (
              <ProductCard
                key={product._id}
                product={product}
                isWishlistItem={isWishlistItem}
              />
            );
          })}
        </CardContent>
        <Divider />
        <CardContent>
          <PaginationButtons
            page={page}
            count={products.totalPages}
            handleChange={(_e, value) => setPage(value)}
            isLoadingNextPage={isFetching}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Products;
