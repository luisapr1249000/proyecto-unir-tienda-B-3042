import React from "react";
import Grid, { Grid2Props } from "@mui/material/Grid2";
import SkeletonCard from "./SkeletonCard";

interface SkeletonCardGridProps extends Grid2Props {
  count?: number;
}

const SkeletonCardGrid = ({ count = 10, ...props }: SkeletonCardGridProps) => {
  return (
    <Grid {...props} container spacing={2}>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </Grid>
  );
};

export default SkeletonCardGrid;
