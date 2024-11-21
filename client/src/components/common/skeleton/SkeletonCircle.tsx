import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonCircle = () => {
  return (
    <Skeleton animation="wave" variant="circular" width={40} height={40} />
  );
};

export default SkeletonCircle;
