import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import IconButtonDelete from "../../common/buttons/iconbutton-delete/IconButtonDelete";
import WishlistButton from "./WishlistButton";
import SavedProductButton from "./SavedProductButton";
import { Product } from "../../../types/product";
import { useAuthUser } from "../../../hooks/auth";
import { useGetUserCart, useGetUserWishlist } from "../../../hooks/user";
const ProductIconButtonActions = ({ product }: { product: Product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const { data: authUser, isSuccess } = useAuthUser();
  const { data: userWishlist } = useGetUserWishlist({
    userId: authUser?._id ?? "",
  });

  const { _id } = product;
  useEffect(() => {
    if (authUser) {
      if (userWishlist) {
        console.log("userCart: ", userWishlist);
        console.log(_id);
        const isFavorite = userWishlist.wishlist
          .map((product) => product._id)
          .some((id) => id === _id);
        setIsInCart(isFavorite);
      }
    }
  }, []);
  return (
    <Grid
      container
      spacing={1}
      direction="column"
      sx={{
        position: "absolute",
        boxShadow: 1,
        p: 1,
        bgcolor: "#eeea",
        top: 0,
        right: 0,
      }}
    >
      <WishlistButton
        productId={product._id}
        userId={authUser?._id}
        isFavorite={isInCart}
        isAuth={isSuccess}
      />
      <SavedProductButton
        productId={product._id}
        userId={authUser?._id}
        isAuth={isSuccess}
      />
    </Grid>
  );
};

export default ProductIconButtonActions;
