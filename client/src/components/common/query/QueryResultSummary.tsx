import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface QueryResultSummaryProps {
  countPerPage: number;
  pagingCounter: number;
  total: number;
  querySearch: string;
  page: number;
  limit?: number;
  totalPages?: number;
}
const QueryResultSummary = ({
  page,
  total,
  querySearch,
  pagingCounter,
  limit,
  totalPages,
}: QueryResultSummaryProps) => {
  const totalDocsPerPage = limit ? limit * page : 10 * page;
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 1.5 }}
      sx={{ alignItems: { xs: "center", md: "flex-start" } }}
      direction={{ xs: "column", md: "row" }}
    >
      <Typography variant="caption" color="textSecondary" component="div">
        Showing {pagingCounter}-{totalDocsPerPage} of {total} results from{" "}
        {querySearch}
      </Typography>
      <Typography variant="caption" color="textSecondary" component="div">
        Page {page} of {totalPages}
      </Typography>
    </Grid>
  );
};

export default QueryResultSummary;
