import { Button, CardActions, IconButton, Tooltip } from "@mui/material";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState } from "react";
import DialogReportProduct from "../dialogs/DialogReportProduct";
import ProductCardModifiedButton from "./ProductCardModifiedButton";
import { ProductId } from "../../../types/product";
import DialogoShareProduct from "../dialogs/DialogoShareProduct";

const ShareProductButton = ({ productId }: ProductId) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const productUrl =
    "http://localhost:3000/products/details/5f8c9c0a0b8a5e0e7e3c";
  return (
    <>
      <Tooltip title="Share">
        <IconButton onClick={handleOpen} color="primary" size="small">
          <ShareIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <DialogoShareProduct
        dialogTitle="Share Product"
        productUrl={productUrl}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};

const ReportProductButton = ({ productId }: ProductId) => {
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

const ProductCardSecondaryActions = ({ productId }: ProductId) => (
  <CardActions sx={{ justifyContent: "flex-end" }}>
    <ProductCardModifiedButton productId={productId} />

    <ReportProductButton productId={productId} />
    <ShareProductButton productId={productId} />
  </CardActions>
);

export default ProductCardSecondaryActions;
