import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import { ProductId } from "../../../../../types/product";
import { BorderIconButton } from "../../../../common/buttons/iconbutton-delete/IconButtonDelete";
import { CartDialog } from "../../../dialogs/CartDialog";
import { useAuthUser } from "../../../../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddToCartButton = ({
  availableQuantity,
  productId,
  productName,
}: { availableQuantity: number; productName: string } & ProductId) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: authUser } = useAuthUser();
  const navigate = useNavigate();
  const handleOpen = () => {
    if (!authUser) {
      toast.warn("Please, login to add to cart");
      navigate("/auth/login");
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <>
      <BorderIconButton
        onClick={handleOpen}
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
