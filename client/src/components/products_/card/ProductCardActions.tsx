import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Wishlist from "../buttons/Wishlist";
import Cart from "../buttons/Cart";
import { ProductId } from "../../../types/product";

const ProductCardActions = ({
  productId,
  isWishlistItem,
  wishlistCount,
}: ProductId & { isWishlistItem: boolean; wishlistCount: number }) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        bgcolor: "white.900",
        p: 1,
        zIndex: 4,
      }}
      component={Grid}
      container
      direction="column"
      square
      spacing={1}
    >
      {/* <Cart productId={productId} /> */}
      <Wishlist
        isWishlistItem={isWishlistItem}
        productId={productId}
        wishlistCount={wishlistCount}
      />
    </Paper>
  );
};

export default ProductCardActions;
