import React, { useEffect, useState } from "react";
import { useGetProductsWithPagination } from "../../../hooks/products.hooks";
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

const Products = () => {
  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { data: authUser } = useAuthUser();
  const { data: cartList } = useGetUserCart({ userId: authUser?._id ?? "" });
  const { data: wishlistList } = useGetUserWishlist({
    userId: authUser?._id ?? "",
  });

  console.log("cartList", cartList);
  console.log("wishlistList", wishlistList);

  const {
    data: products,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetProductsWithPagination({
    isKeepPreviousData: true,
    page,
    limit,
    sort: sortBy,
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
      <Card
        variant="outlined"
        // component={Grid}
      >
        {/* <Grid size={{ xs: 12, md: 6 }}> */}
        <CardActions sx={{ flexGrow: 1 }}>
          <Grid size={{ xs: 6 }} container sx={{ flexGrow: 1 }} spacing={2}>
            <Grid
              size={{ xs: 5 }}
              container
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Paper variant="outlined" sx={{ flexGrow: 1 }}>
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
            </Grid>
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
        </CardActions>
        {/* </Grid>  */}

        <Divider />
        <CardContent sx={{ p: 6 }} component={Grid} container spacing={2}>
          {products.docs.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </CardContent>
        <Divider />
        <CardActions sx={{ mt: 3 }}>
          <PaginationButtons
            page={page}
            count={products.totalPages}
            handleChange={(_e, value) => setPage(value)}
            isLoadingNextPage={isFetching}
          />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Products;
