import React from "react";
import Grid from "@mui/material/Grid2";
import LoadSpinner from "./LoadSpinner";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import { fullHeight } from "../../../assets/css/mui-css-objects/muiStyles";
import SkeletonCard from "../skeleton/SkeletonCard";
const GridLoadingSkeleton = () => {
  const arrayLength = Array.from({ length: 20 });
  return (
    <Grid container spacing={3} sx={{ ...gridContainerCenter }}>
      {arrayLength.map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </Grid>
  );
};

export default GridLoadingSkeleton;
