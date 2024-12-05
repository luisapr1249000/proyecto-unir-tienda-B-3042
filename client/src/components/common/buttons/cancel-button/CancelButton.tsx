import ClearIcon from "@mui/icons-material/Clear";
import { Button, Typography } from "@mui/material";
import React from "react";

const CancelButton = ({
  fullWidth = false,
  onCancel,
}: {
  fullWidth?: boolean;
  onCancel?: () => void;
}) => {
  return (
    <Button
      variant="outlined"
      color="error"
      fullWidth={fullWidth}
      endIcon={<ClearIcon fontSize="inherit" />}
      onClick={onCancel}
    >
      <Typography variant="body2">Cancel</Typography>
    </Button>
  );
};

export default CancelButton;
