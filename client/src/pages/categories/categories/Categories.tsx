import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Paper, Divider } from "@mui/material";
import CategoryCard from "../../../components/categories/card/CategoryCard";
import { useGetCategoriesWithPagination_ } from "../../../hooks/categories.hooks";
import PaginationButtons from "../../../components/common/sort-and-pagination/PaginationButtons";
import LoadSpinner from "../../../components/common/load-spinner/LoadSpinner";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import QueryResultSummary from "../../../components/common/query/QueryResultSummary";
import PageLimitSetter from "../../../components/common/query/PageLimitSetter";

const Categories = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: categories,
    isLoading,
    error,
    refetch,
    isFetching: isFetchingCategories,
  } = useGetCategoriesWithPagination_({
    page: page,
    limit: limit,
    isKeepPreviousData: true,
  });

  const handleChange = (_e: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);

  if (isLoading) return <LoadSpinner isBackdrop />;
  if (error) return <ObjectNotFound object="Category" onReload={refetch} />;
  if (!categories)
    return <ObjectNotFound object="Category" onReload={refetch} />;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  }, [page]);

  console.log(page);
  return (
    <Grid
      container
      sx={{
        // height: "calc(100vh)",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        variant="outlined"
        component={Grid}
        container
        spacing={3}
        size={{ xs: 10 }}
        sx={{ p: 4, mb: 3 }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <QueryResultSummary
            page={page}
            limit={limit}
            pagingCounter={categories.pagingCounter}
            countPerPage={categories.limit}
            sortBy="createdAt"
            sortDirection="asc"
            total={categories.totalDocs}
            querySearch={"Products"}
          />
        </Grid>
        <Grid container size={{ xs: 12, md: 6 }}>
          <Grid size={{ xs: 12 }}>
            <PageLimitSetter limit={limit} setLimit={setLimit} />
          </Grid>
        </Grid>
        {categories.docs.map((category) => (
          <Grid key={category._id} size={{ xs: 12, md: 6 }} spacing={3}>
            <CategoryCard key={category._id} category={category} />
          </Grid>
        ))}
      </Paper>
      <PaginationButtons
        count={categories?.totalPages}
        handleChange={handleChange}
        page={page}
        isLoadingNextPage={isFetchingCategories}
      />
    </Grid>
  );
};

export default Categories;
