import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

const ProductResultOverviewInfo = ({
  totalDocs,
  startResult,
  endResultPerPage,
}: {
  totalDocs: number;
  startResult: number;
  endResultPerPage: number;
}) => {
  return (
    <Grid
      container
      size={{ xs: 6, md: 4 }}
      sx={{ p: 2, bgcolor: "#eeea", justifyContent: "space-between" }}
      component={Paper}
    >
      <Typography variant="body2" component="div" color="textSecondary">
        Showing: {startResult} - {endResultPerPage} of {totalDocs} results
      </Typography>
    </Grid>
  );
};

export default ProductResultOverviewInfo;
