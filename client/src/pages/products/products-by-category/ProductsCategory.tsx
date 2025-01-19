import { useLocation, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useGetCategoryByName } from "../../../hooks/categories.hooks";
import GridLoadingSkeleton from "../../../components/common/load-spinner/GridLoadingSkeleton";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import { useGetProductsByCategoryWithPagination } from "../../../hooks/products.hooks";
import QueryResultSummary from "../../../components/common/query/QueryResultSummary";
import { useEffect, useState } from "react";
import PageLimitSetter from "../../../components/common/query/PageLimitSetter";
import SortSelecter from "../../../components/common/sort-and-pagination/SortSelecter";
import ProductCard from "../../../components/products_/card/ProductCard";
import PaginationButtons from "../../../components/common/sort-and-pagination/PaginationButtons";
import { Category } from "../../../types/category";
import SkeletonCardGrid from "../../../components/common/skeleton/SkeletonCardGrid";
import BreadCrumbs from "../../../components/common/breadcrumbs/BreadCrumbs";
import { useGetUserWishlist } from "../../../hooks/user";
import { useAuthUser } from "../../../hooks/auth";
import priceStore from "../../../zustand/priceSlice";

const ProductsByCategory = ({ category }: { category: Category }) => {
  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
    isFetching,
  } = useGetProductsByCategoryWithPagination({
    categoryId: category._id,
    minPrice: priceStore.getState().price.min,
    maxPrice: priceStore.getState().price.max,
    limit,
    page,
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
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  }, [page]);

  if (isLoadingProducts)
    return (
      <SkeletonCardGrid
        sx={{ justifyContent: "center", alignItems: "center", py: 6 }}
      />
    );
  if (errorProducts)
    return <ObjectNotFound object="Prodcts" onReload={refetchProducts} />;
  if (!products)
    return <ObjectNotFound object="Prodcts" onReload={refetchProducts} />;
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
      <BreadCrumbs />
      <Card>
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
                  querySearch={`Products in category ${category.name}`}
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

const ProductsCategory = () => {
  const { categoryName } = useParams() as { categoryName: string };
  const {
    data: category,
    isLoading,
    error,
    isSuccess,
    refetch: refetchCategory,
  } = useGetCategoryByName({
    categoryName,
  });

  if (isLoading) return <GridLoadingSkeleton />;
  if (error)
    return <ObjectNotFound object="Category" onReload={refetchCategory} />;
  if (!category)
    return <ObjectNotFound object="Category" onReload={refetchCategory} />;

  return <ProductsByCategory category={category} />;
};

export default ProductsCategory;
