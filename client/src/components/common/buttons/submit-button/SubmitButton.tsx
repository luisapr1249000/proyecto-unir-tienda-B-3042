import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Typography } from "@mui/material";

const SubmitButton = ({ fullWidth = false, isValid = false }) => {
  return (
    <Button
      variant="outlined"
      fullWidth={fullWidth}
      disabled={!isValid}
      endIcon={<ArrowForwardIcon fontSize="inherit" />}
      type="submit"
    >
      <Typography variant="body2">Submit</Typography>
    </Button>
  );
};

export default SubmitButton;
