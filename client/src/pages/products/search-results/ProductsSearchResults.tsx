import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import GridLoadingSkeleton from "../../../components/common/load-spinner/GridLoadingSkeleton";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import QueryResultSummary from "../../../components/common/query/QueryResultSummary";
import PageLimitSetter from "../../../components/common/query/PageLimitSetter";
import SortSelecter from "../../../components/common/sort-and-pagination/SortSelecter";
import PaginationButtons from "../../../components/common/sort-and-pagination/PaginationButtons";
import { useSearchProducts } from "../../../hooks/products.hooks";
import ProductCard from "../../../components/products_/card/ProductCard";
import { useAuthUser } from "../../../hooks/auth";
import { useGetUserWishlist } from "../../../hooks/user";

const ProductsSearchResults = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(10);

  const [searchParams] = useSearchParams();

  const {
    data: products,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useSearchProducts({
    query: searchParams.get("query") || "",
    minPrice: 0,
    maxPrice: Infinity,
    page: page,
    limit: 10,
    sort: sortBy,
  });

  const { data: authUser } = useAuthUser();
  const { data: wishlistList } = useGetUserWishlist({
    userId: authUser?._id ?? "",
    enabled: !!authUser,
  });

  const handleChangeSort = (sort: string) => {
    setSortBy(sort);
    setPage(1);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, searchParams.get("query"), navigate]);

  if (isLoading) return <GridLoadingSkeleton />;
  if (error)
    return <ObjectNotFound object="Product" multiple onReload={refetch} />;
  if (!products)
    return <ObjectNotFound object="Product" multiple onReload={refetch} />;

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

export default ProductsSearchResults;
