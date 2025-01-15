import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import Wishlist from "../buttons/Wishlist";
import Cart from "../buttons/Cart";

const ProductCardActions = () => {
  return (
    <Paper
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        bgcolor: "white.900",
        p: 1,
      }}
      component={Grid}
      container
      direction="column"
      square
      spacing={1}
    >
      <Cart />
      <Wishlist />
    </Paper>
  );
};

export default ProductCardActions;
