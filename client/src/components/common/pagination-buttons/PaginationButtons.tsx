import { Pagination, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import LoadSpinner from "../load-spinner/LoadSpinner";

const PaginationButtons = ({
  page,
  count,
  handleChange,
  isLoadingNextPage,
}: {
  page: number;
  count?: number;
  handleChange: (e: React.ChangeEvent<unknown>, value: number) => void;
  isLoadingNextPage?: boolean;
}) => {
  return (
    <Grid
      sx={{ justifyContent: "center", alignItems: "center" }}
      size={{ xs: 12 }}
      container
      spacing={2}
      direction="column"
    >
      <Pagination count={count} page={page} onChange={handleChange} />
      <Grid container>
        {isLoadingNextPage ? (
          <LoadSpinner />
        ) : (
          <>
            <Typography variant="body2" color="textSecondary">
              Page:
            </Typography>
            <Typography variant="body2">{page}</Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default PaginationButtons;
