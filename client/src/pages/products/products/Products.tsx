import { useEffect, useState } from "react";
import { useGetProductsWithPagination } from "../../../hooks/products.hooks";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../../components/products/card/ProductCard";
import { GridObjectNotFound } from "../../../components/common/errors/object-not-found/ObjectNotFound";
import QueryResultSummary from "../../../components/common/query/QueryResultSummary";
import SortSelecter from "../../../components/common/sort-and-pagination/SortSelecter";
import PaginationButtons from "../../../components/common/sort-and-pagination/PaginationButtons";
import { Divider, Card, CardContent, Typography } from "@mui/material";
import PageLimitSetter from "../../../components/common/query/PageLimitSetter";
import { useAuthUser } from "../../../hooks/auth";
import { useGetUserWishlist } from "../../../hooks/user";

import usePriceStore from "../../../zustand/priceSlice";
import { Link } from "../../../components/common/react-link/Link";
import { GridBorderRadious } from "../../../assets/css/mui-css-objects/grid";
import ProductCardSkeletonGrid from "../../../components/products/skeleton/ProductCardSkeletonGrid";

const Products = () => {
  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);

  const { data: authUser } = useAuthUser();
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
  } = useGetProductsWithPagination({
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
  if (isFetching || isLoading) return <ProductCardSkeletonGrid />;
  if (error)
    return (
      <GridObjectNotFound
        onReload={refetch}
        message="Try searching for something else"
        multiple
        object="Product"
      />
    );
  if (!products)
    return (
      <GridObjectNotFound
        onReload={refetch}
        message="Try searching for something else"
        multiple
        object="Product"
      />
    );

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
      <Card elevation={4} sx={{ flexGrow: 1, ...GridBorderRadious }}>
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
            querySearch={`Products`}
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
