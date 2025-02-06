import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import { ProductId } from "../../../../../types/product";
import { BorderIconButton } from "../../../../common/buttons/iconbutton-delete/IconButtonDelete";
import { CartDialog } from "../../../dialogs/CartDialog";

const AddToCartButton = ({
  availableQuantity,
  productId,
  productName,
}: { availableQuantity: number; productName: string } & ProductId) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

export default AddToCartButton;
