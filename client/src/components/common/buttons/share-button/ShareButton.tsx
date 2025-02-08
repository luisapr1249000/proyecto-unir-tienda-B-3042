import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import { IconButton, IconButtonProps } from "@mui/material";

const ShareButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props}>
      <ShareIcon fontSize="inherit" color="primary" />
    </IconButton>
  );
};

export default ShareButton;
