import { Card, CardContent, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

const SkeletonCard = () => {
  return (
    <Card component={Grid} size={{ xs: 12, lg: 3 }} variant="outlined">
      <Skeleton sx={{ height: 150 }} animation="wave" variant="rectangular" />
      <CardContent>
        <Skeleton animation="wave" sx={{ width: 1, mb: 1, mt: 1 }} />
        <Skeleton animation="wave" sx={{ width: 1 }} />
        <Skeleton animation="wave" sx={{ width: 0.5, mt: 2 }} />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
