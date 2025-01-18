import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import Wishlist from "../buttons/Wishlist";
import Cart from "../buttons/Cart";
import { ProductId } from "../../../types/product";
import { useGetUserCart, useGetUserWishlist } from "../../../hooks/user";
import { useAuthUser } from "../../../hooks/auth";

const ProductCardActions = ({ productId }: ProductId) => {
  const { data: authUser } = useAuthUser();
  const { data: cartList } = useGetUserCart({ userId: authUser?._id ?? "" });
  const { data: wishlistList } = useGetUserWishlist({
    userId: authUser?._id ?? "",
  });

  console.log("wishlistList", wishlistList);
  console.log("cartList", cartList);
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
      <Cart productId={productId} />
      <Wishlist productId={productId} />
    </Paper>
  );
};

export default ProductCardActions;
