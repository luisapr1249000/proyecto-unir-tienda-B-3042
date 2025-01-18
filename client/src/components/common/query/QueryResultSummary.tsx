import { Card, CardContent, Divider, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface QueryResultSummaryProps {
  countPerPage: number;
  pagingCounter: number;
  total: number;
  querySearch: string;
  sortBy: string;
  sortDirection: string;
  page: number;
  limit?: number;
}
const QueryResultSummary = (queryResult: QueryResultSummaryProps) => {
  const totalDocsPerPage = queryResult.limit
    ? queryResult.limit * queryResult.page
    : 10 * queryResult.page;
  return (
    // <Card variant="outlined" sx={{ display: "flex", height: 50 }}>
    <CardContent>
      <Typography variant="caption" color="textSecondary" component="div">
        Showing {queryResult.pagingCounter}-{totalDocsPerPage} of{" "}
        {queryResult.total} results from {queryResult.querySearch}
      </Typography>
    </CardContent>
    // </Card>
  );
};

export default QueryResultSummary;
