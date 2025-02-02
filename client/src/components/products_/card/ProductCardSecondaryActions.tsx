import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, CardActions, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState } from "react";
import DialogReportProduct from "../dialogs/DialogReportProduct";
import { ProductId, ProductProp } from "../../../types/product";
import DialogoShareProduct from "../dialogs/DialogoShareProduct";
import { IconButtonLink } from "../../common/buttons/link/ButtonLink";
import EditIcon from "@mui/icons-material/Edit";
import { BorderIconButton } from "../../common/buttons/iconbutton-delete/IconButtonDelete";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetAuthUser } from "../../../hooks/auth";
import { CartDialog } from "../dialogs/CartDialog";
import { isOwnerOrAdmin } from "../../../utils/utils";

export const ProductCardModifiedButton = ({
  productId,
}: {
  productId: string;
}) => (
  <Tooltip title="Edit Product">
    <IconButtonLink size="small" to={`/products/items/${productId}/update`}>
      <EditIcon color="primary" fontSize="inherit" />
    </IconButtonLink>
  </Tooltip>
);

export const ShareProductButton = ({ productId }: ProductId) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const productUrl = `http://localhost:3000/products/details/${productId}`;
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

export const ReportProductButton = ({ productId }: ProductId) => {
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

export const ProductAddToCartButton = ({
  availableQuantity,
  productId,
  productName,
}: { availableQuantity: number; productName: string } & ProductId) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data: authUser } = useGetAuthUser();

  const handleClick = (productId: string) => {
    if (!authUser) {
      toast.warn("Please login to add to Cart");
      navigate("/auth/login");
    }
    console.log("productId", productId);
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <>
      <BorderIconButton
        onClick={handleOpenDialog}
        size="small"
        color="primary"
        tooltipTitle="Add to Cart"
      >
        <AddShoppingCartIcon fontSize="small" />
      </BorderIconButton>
      <CartDialog
        availabilityQuantity={availableQuantity}
        productId={productId}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        productName={productName}
      />
    </>
  );
};

const ProductCardSecondaryActions = ({ product }: ProductProp) => {
  const { _id: productId } = product;
  const { data: authUser } = useGetAuthUser();
  return (
    <CardActions sx={{ justifyContent: "space-between" }}>
      <ProductAddToCartButton
        availableQuantity={product.quantity}
        productId={productId}
        productName={product.name}
      />
      <Grid>
        {authUser &&
          isOwnerOrAdmin({
            authorId: product.author._id,
            role: authUser.role,
            userId: authUser._id,
          }) && <ProductCardModifiedButton productId={productId} />}
        <ReportProductButton productId={productId} />
        <ShareProductButton productId={productId} />
      </Grid>
    </CardActions>
  );
};

export default ProductCardSecondaryActions;
