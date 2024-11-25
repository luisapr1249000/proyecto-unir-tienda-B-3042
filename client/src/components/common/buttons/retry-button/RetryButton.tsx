import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const RetryButton = ({
  onReload,
  isIconButton = false,
}: {
  onReload: () => void;
  isIconButton?: boolean;
}) => {
  return isIconButton ? (
    <IconButton onClick={onReload}>
      <HomeIcon />
    </IconButton>
  ) : (
    <Button endIcon={<HomeIcon />} variant="outlined" onClick={onReload}>
      <Typography>Retry</Typography>
    </Button>
  );
};

export default RetryButton;
