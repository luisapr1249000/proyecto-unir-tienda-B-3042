import { Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import React from "react";

const SkeletonCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 250,
        width: 250,
        maxHeight: 300,
        height: 300,
        position: "relative",
      }}
      variant="outlined"
    >
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
