import WishlistButton from "./WishlistButton";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ProductId } from "../../../../../types/product";
const Wishlist = ({
  productId,
  isWishlistItem = false,
}: ProductId & {
  isWishlistItem: boolean;
}) => {
  return (
    <Paper
      direction={"column"}
      component={Grid}
      container
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        p: 0.5,
        justifyContent: "center",
        alignItems: "center",
      }}
      square
      elevation={1}
    >
      <WishlistButton productId={productId} isWishlistItem={isWishlistItem} />
    </Paper>
  );
};

export default Wishlist;
