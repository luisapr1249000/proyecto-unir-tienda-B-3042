import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { useGetUsersWithPagination_ } from "../../hooks/user";
import CircleLoadingGrid from "../../components/common/loaders/CircleLoadingGrid";
import { GridObjectNotFound } from "../../components/common/errors/object-not-found/ObjectNotFound";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import UserCard from "../../components/users_/card/UserCard";
import PageLimitSetter from "../../components/common/query/PageLimitSetter";
import SortSelecter from "../../components/common/sort-and-pagination/SortSelecter";
import { Link } from "../../components/common/react-link/Link";
import QueryResultSummary from "../../components/common/query/QueryResultSummary";
import PaginationButtons from "../../components/common/sort-and-pagination/PaginationButtons";
import SellersHelmet from "./SellersHelmet";

const Sellers = () => {
  const [sortBy, setSortBy] = useState("-createdAt");
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);

  const {
    data: users,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetUsersWithPagination_({
    page: page,
    limit: limit,
    sort: sortBy,
    query: "true",
    isKeepPreviousData: true,
  });
  const handleChangeSort = (sort: string) => {
    setSortBy(sort);
    setPage(1);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  }, [page]);

  if (isLoading) return <CircleLoadingGrid />;
  if (error)
    return (
      <GridObjectNotFound
        message="Try searching something else"
        object="Seller"
        onReload={refetch}
      />
    );
  if (!users)
    return (
      <GridObjectNotFound
        message="Try searching something else"
        object="Seller"
        onReload={refetch}
      />
    );

  return (
    <>
      <SellersHelmet />
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
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
              <Link underline="none" to="/sellers">
                Sellers
              </Link>
            </Typography>
            <QueryResultSummary
              page={page}
              limit={limit}
              pagingCounter={users.pagingCounter}
              countPerPage={users.limit}
              total={users.totalDocs}
              querySearch={`Sellers`}
              totalPages={users.totalPages}
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
          </CardContent>{" "}
          <Divider />
          <CardContent component={Grid} container spacing={2}>
            {users.docs.map((user) => (
              <Grid key={user._id} size={{ xs: 12, md: 3 }} spacing={3}>
                <UserCard isSeller user={user} />
              </Grid>
            ))}
          </CardContent>
          <Divider />
          <CardActions sx={{ mt: 3 }}>
            <PaginationButtons
              page={page}
              count={users.totalPages}
              handleChange={(_e, value) => setPage(value)}
              isLoadingNextPage={isFetching}
            />
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Sellers;
