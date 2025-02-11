import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { GridObjectNotFound } from "../../../components/common/errors/object-not-found/ObjectNotFound";
import QueryResultSummary from "../../../components/common/query/QueryResultSummary";
import { useEffect, useState } from "react";
import PageLimitSetter from "../../../components/common/query/PageLimitSetter";
import SortSelecter from "../../../components/common/sort-and-pagination/SortSelecter";
import ProductCard from "../../../components/products/card/ProductCard";
import PaginationButtons from "../../../components/common/sort-and-pagination/PaginationButtons";
import { useGetUserByUsername, useGetUserWishlist } from "../../../hooks/user";
import { useAuthUser } from "../../../hooks/auth";
import priceStore from "../../../zustand/priceSlice";
import { useGetProductsWithPagination } from "../../../hooks/products.hooks";
import { Link } from "../../../components/common/react-link/Link";
import ProductCardSkeletonGrid from "../../../components/products/skeleton/ProductCardSkeletonGrid";
import ProductsBySellerHelmet from "./ProductsBySellerHelmet";

const ProductsBySeller = () => {
  const { username } = useParams() as { username: string };

  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser,
  } = useGetUserByUsername({ username: username, enabled: !!username });

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
    isFetching,
  } = useGetProductsWithPagination({
    minPrice: priceStore.getState().price.min,
    maxPrice: priceStore.getState().price.max,
    limit,
    page,
    sort: sortBy,
    userId: user?._id ?? "",

    enabled: !!user,
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
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  }, [page]);

  if (isLoadingUser) return <ProductCardSkeletonGrid />;
  if (userError)
    return <GridObjectNotFound object="User" onReload={refetchUser} />;
  if (!user) return <GridObjectNotFound object="User" onReload={refetchUser} />;

  const message = "Seller might not have any products";
  if (isLoadingProducts) return <ProductCardSkeletonGrid />;
  if (errorProducts)
    return (
      <GridObjectNotFound
        message={message}
        object="Products"
        onReload={refetchProducts}
      />
    );
  if (!products)
    return (
      <GridObjectNotFound
        message={message}
        object="Products"
        onReload={refetchProducts}
      />
    );
  return (
    <>
      <ProductsBySellerHelmet sellerName={user.username} />
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
              querySearch={`Products by ${user.username}`}
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
    </>
  );
};

export default ProductsBySeller;
