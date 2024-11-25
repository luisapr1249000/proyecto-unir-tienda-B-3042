import { Button } from "@mui/material";
import React from "react";

const ConfirmButton = ({
  onConfirm,
  text = "Confirm",
}: {
  onConfirm: () => void;
  text?: string;
}) => {
  return (
    <Button variant="contained" onClick={onConfirm}>
      {text}
    </Button>
  );
};

export default ConfirmButton;
