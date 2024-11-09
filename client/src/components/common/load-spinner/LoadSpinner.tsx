import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const LoadSpinner = ({ isBackdrop = false }) => {
  const backdrop = (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return isBackdrop ? backdrop : <CircularProgress color="inherit" />;
};

export default LoadSpinner;
