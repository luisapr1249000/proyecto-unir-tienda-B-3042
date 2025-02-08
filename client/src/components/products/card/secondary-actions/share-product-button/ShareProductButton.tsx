import ShareIcon from "@mui/icons-material/Share";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { ProductId } from "../../../../../types/product";
import ShareProductDialog from "../../../dialogs/ShareProductDialog";

const ShareProductButton = ({ productId }: ProductId) => {
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
      <ShareProductDialog
        productUrl={productUrl}
        onClose={handleClose}
        open={open}
      />
    </>
  );
};

export default ShareProductButton;
