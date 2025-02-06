import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Paper, Divider, Card, CardContent, Typography } from "@mui/material";
import CategoryCard from "../../../components/categories/card/CategoryCard";
import { useGetCategoriesWithPagination_ } from "../../../hooks/categories.hooks";
import PaginationButtons from "../../../components/common/sort-and-pagination/PaginationButtons";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import QueryResultSummary from "../../../components/common/query/QueryResultSummary";
import PageLimitSetter from "../../../components/common/query/PageLimitSetter";
import { Link } from "../../../components/common/react-link/Link";
import CircleLoadingGrid from "../../../components/common/loaders/CircleLoadingGrid";
import SortSelecter from "../../../components/common/sort-and-pagination/SortSelecter";

const Categories = () => {
  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);

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

  const handleChangeSort = (sort: string) => {
    setSortBy(sort);
    setPage(1);
  };

  const handleChange = (_e: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  }, [page]);

  if (isLoading) return <CircleLoadingGrid />;
  if (error) return <ObjectNotFound object="Category" onReload={refetch} />;
  if (!categories)
    return <ObjectNotFound object="Category" onReload={refetch} />;

  return (
    <Grid
      container
      sx={{ justifyContent: "center", alignContent: "center", p: 3 }}
    >
      <Card sx={{ flexGrow: 1 }} elevation={4}>
        <CardContent
          component={Grid}
          container
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography>
            <Link underline="none" to="/categories">
              Categories
            </Link>
          </Typography>
          <QueryResultSummary
            page={page}
            limit={limit}
            pagingCounter={categories.pagingCounter}
            countPerPage={categories.limit}
            total={categories.totalDocs}
            querySearch={`categories`}
            totalPages={categories.totalPages}
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
        <CardContent
          component={Grid}
          container
          spacing={3}
          sx={{ flexGrow: 1 }}
        >
          {categories.docs.map((category) => (
            <Grid key={category._id} size={{ xs: 12, md: 6 }} spacing={3}>
              <CategoryCard key={category._id} category={category} />
            </Grid>
          ))}
        </CardContent>
        <CardContent>
          <PaginationButtons
            count={categories?.totalPages}
            handleChange={handleChange}
            page={page}
            isLoadingNextPage={isFetchingCategories}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Categories;
