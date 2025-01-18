import { Button, CardActions, IconButton, Tooltip } from "@mui/material";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import React, { useState } from "react";
import DialogReportProduct from "../dialogs/DialogReportProduct";
import ProductCardModifiedButton from "./ProductCardModifiedButton";

const ReportProductButton = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Tooltip title="Report">
        <IconButton onClick={handleOpen} color="error" size="small">
          <OutlinedFlagIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <DialogReportProduct
        productId={productId}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

const ProductCardSecondaryActions = ({ productId }: { productId: string }) => {
  return (
    <CardActions sx={{ justifyContent: "flex-end" }}>
      <ReportProductButton productId={productId} />
      <ProductCardModifiedButton productId={productId} />
    </CardActions>
  );
};

export default ProductCardSecondaryActions;
