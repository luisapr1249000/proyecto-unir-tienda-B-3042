import { Button, CardActions, IconButton, Tooltip } from "@mui/material";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import React, { useState } from "react";
import DialogReportProduct from "../dialogs/DialogReportProduct";

const ProductCardSecondaryActions = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <CardActions sx={{ justifyContent: "flex-end" }}>
      <Tooltip title="Report">
        <IconButton onClick={handleOpen} color="error" size="small">
          <OutlinedFlagIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <DialogReportProduct handleClose={handleClose} open={open} />
    </CardActions>
  );
};

export default ProductCardSecondaryActions;
