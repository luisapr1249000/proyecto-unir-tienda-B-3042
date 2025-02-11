import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GridObjectNotFound } from "../../../components/common/errors/object-not-found/ObjectNotFound";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import QueryResultSummary from "../../../components/common/query/QueryResultSummary";
import PageLimitSetter from "../../../components/common/query/PageLimitSetter";
import SortSelecter from "../../../components/common/sort-and-pagination/SortSelecter";
import PaginationButtons from "../../../components/common/sort-and-pagination/PaginationButtons";
import ProductCard from "../../../components/products/card/ProductCard";
import { useAuthUser } from "../../../hooks/auth";
import { useGetUserWishlist } from "../../../hooks/user";
import { useGetProductsWithPagination } from "../../../hooks/products.hooks";
import { Link } from "../../../components/common/react-link/Link";
import ProductCardSkeletonGrid from "../../../components/products/skeleton/ProductCardSkeletonGrid";
import ProductsSearchResultsHelmet from "./ProductsSearchResultsHelmet";

const ProductsSearchResults = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(12);

  const [searchParams] = useSearchParams();

  const {
    data: products,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetProductsWithPagination({
    query: searchParams.get("query") || "",
    minPrice: 1,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchParams.get("query"), navigate]);

  if (isLoading) return <ProductCardSkeletonGrid />;
  if (error)
    return (
      <GridObjectNotFound
        message="Please, Try again"
        object="Product"
        multiple
        onReload={refetch}
      />
    );
  if (!products)
    return (
      <GridObjectNotFound
        message="Please, Try again"
        object="Product"
        multiple
        onReload={refetch}
      />
    );

  return (
    <>
      <ProductsSearchResultsHelmet
        searchQuery={searchParams.get("query") ?? ""}
      />
      <Grid
        container
        spacing={5}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Card sx={{ flexGrow: 1 }} elevation={3}>
          <CardContent
            component={Grid}
            container
            direction={{ xs: "column", md: "row" }}
            spacing={1}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography>
              <Link underline="none" to="/products">
                Products
              </Link>
            </Typography>
            <QueryResultSummary
              page={page}
              limit={limit}
              pagingCounter={products.pagingCounter}
              countPerPage={products.limit}
              total={products.totalDocs}
              querySearch={`Query: ${searchParams.get("query") || ""}`}
              totalPages={products.totalPages}
            />
          </CardContent>
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
              direction={{ xs: "column", md: "row" }}
              sx={{ alignItems: "center" }}
            >
              <Grid
                container
                sx={{ justifyContent: "center", alignItems: "center" }}
                size={{ xs: 12, md: "grow" }}
              >
                <PageLimitSetter limit={limit} setLimit={setLimit} />
              </Grid>

              <Grid
                container
                size={{ xs: 12, md: "grow" }}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <SortSelecter sortBy={sortBy} handleChange={handleChangeSort} />
              </Grid>
            </Grid>
          </CardContent>

          <Divider />
          <CardContent sx={{ p: 3 }} component={Grid} container spacing={3}>
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
    </>
  );
};

export default ProductsSearchResults;
