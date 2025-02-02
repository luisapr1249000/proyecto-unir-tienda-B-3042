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
import { useGetProductsWithPagination } from "../../../hooks/products.hooks";
import { Link } from "../../../components/common/react-link/Link";
import CircleLoadingGrid from "../../../components/common/loaders/CircleLoadingGrid";

const ProductsByCategory = ({ category }: { category: Category }) => {
  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
    isFetching,
  } = useGetProductsWithPagination({
    categoryId: category._id,
    minPrice: priceStore.getState().price.min,
    maxPrice: priceStore.getState().price.max,
    limit,
    page,
    sort: sortBy,
    isKeepPreviousData: true,
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

  if (isLoadingProducts) return <CircleLoadingGrid />;
  if (errorProducts)
    return <ObjectNotFound object="Products" onReload={refetchProducts} />;
  if (!products)
    return <ObjectNotFound object="Products" onReload={refetchProducts} />;
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
      {/* <BreadCrumbs /> */}
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
            querySearch={`Products by ${category.name}`}
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
  );
};

const ProductsCategory = () => {
  const { categoryName } = useParams() as { categoryName: string };
  const {
    data: category,
    isLoading,
    error,
    refetch: refetchCategory,
  } = useGetCategoryByName({
    categoryName,
  });

  if (isLoading) return <CircleLoadingGrid />;
  if (error)
    return <ObjectNotFound object="Category" onReload={refetchCategory} />;
  if (!category)
    return <ObjectNotFound object="Category" onReload={refetchCategory} />;

  return <ProductsByCategory category={category} />;
};

export default ProductsCategory;
