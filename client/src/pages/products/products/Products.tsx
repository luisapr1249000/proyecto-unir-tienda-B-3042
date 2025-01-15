import React, { useEffect, useState } from "react";
import { useGetProductsWithPagination } from "../../../hooks/products.hooks";
import GridLoaderCenter from "../../../components/common/grid/grid-loader-center/GridLoaderCenter";
import GridObjectNotFound from "../../../components/common/object-not-found/GridObjectNotFound";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../../components/products_/card/ProductCard";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import QueryResultSummary from "../../../components/common/query/QueryResultSummary";
import SortToggleButtons from "../../../components/common/buttons/sort-toggle-buttons/SortToggleButtons";
import SortSelecter from "../../../components/common/sort-and-pagination/SortSelecter";
import PaginationButtons from "../../../components/common/sort-and-pagination/PaginationButtons";
import { Paper } from "@mui/material";
import PageLimitSetter from "../../../components/common/query/PageLimitSetter";
import SkeletonCardGrid from "../../../components/common/skeleton/SkeletonCardGrid";

const Products = () => {
  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

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
        py: 6,
        // bgcolor: "palette.background.paper",
      }}
    >
      <Grid
        container
        size={{ xs: 11 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
        direction={{ xs: "column", md: "row" }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <QueryResultSummary
            page={page}
            limit={limit}
            pagingCounter={products.pagingCounter}
            countPerPage={products.limit}
            sortBy="createdAt"
            sortDirection="asc"
            total={products.totalDocs}
            querySearch={"Products"}
          />
        </Grid>
        <Grid container size={{ xs: 12, md: 6 }}>
          <Grid size={{ xs: 6 }}>
            <PageLimitSetter limit={limit} setLimit={setLimit} />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <SortSelecter sortBy={sortBy} handleChange={handleChangeSort} />
          </Grid>
        </Grid>
        <Grid
          container
          size={{ xs: 12 }}
          sx={{ p: 4 }}
          component={Paper}
          variant="outlined"
        >
          {products.docs.map((product) => (
            <ProductCard product={product} />
          ))}
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <PaginationButtons
          page={page}
          count={products.totalPages}
          handleChange={(_e, value) => setPage(value)}
          isLoadingNextPage={isFetching}
        />
      </Grid>
    </Grid>
  );
};

export default Products;
