import React from "react";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../../assets/css/mui-css-objects/gridCenter";
import LoadSpinner from "../../load-spinner/LoadSpinner";

const GridLoaderCenter = () => {
  return (
    <Grid
      size={{ xs: 12 }}
      container
      sx={{ ...gridContainerCenter, height: "calc(100vh)" }}
    >
      <LoadSpinner />
    </Grid>
  );
};

export default GridLoaderCenter;
