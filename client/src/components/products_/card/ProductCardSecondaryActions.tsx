import { CardActions } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ProductProp } from "../../../types/product";
import { useGetAuthUser } from "../../../hooks/auth";
import { isOwnerOrAdmin } from "../../../utils/utils";
import EditProductButton from "./secondary-actions/edit-button/EditProductButton";
import AddToCartButton from "./secondary-actions/add-to-cart-button/AddToCartButton";
import ReportProductButton from "./secondary-actions/report-product-button/ReportProductButton";
import ShareProductButton from "./secondary-actions/share-product-button/ShareProductButton";

const ProductCardSecondaryActions = ({ product }: ProductProp) => {
  const { _id: productId } = product;
  const { data: authUser } = useGetAuthUser();
  return (
    <CardActions sx={{ justifyContent: "space-between" }}>
      <AddToCartButton
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
          }) && <EditProductButton productId={productId} />}
        <ReportProductButton productId={productId} />
        <ShareProductButton productId={productId} />
      </Grid>
    </CardActions>
  );
};

export default ProductCardSecondaryActions;
