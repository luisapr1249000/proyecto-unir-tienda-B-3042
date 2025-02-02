import { IconButton, Tooltip, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { useAuthUser, useGetAuthUser } from "../../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProductInWishlist } from "../../../api/users/userProductActions.api";
import { ProductId } from "../../../types/product";
import LoadSpinner from "../../common/load-spinner/LoadSpinner";
import Grid from "@mui/material/Grid2";
const Wishlist = ({
  productId,
  isWishlistItem,
  wishlistCount,
}: ProductId & { isWishlistItem: boolean; wishlistCount: number }) => {
  const queryClient = useQueryClient();
  const { data: authUser, isSuccess: isAuthSuccess } = useAuthUser();
  const navigate = useNavigate();
  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: toggleProductInWishlist,
    onSuccess: () => {
      console.log("success");
      toast.success("Product added to Wishlist successfully");
      queryClient.invalidateQueries({
        queryKey: [`user-${authUser?._id}-wishlist`],
      });
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Something went wrong");
    },
  });

  const handleClick = () => {
    console.log("authUser", authUser);
    if (!authUser) {
      toast.warn("Please login to add to Wishlist");
      navigate("/auth/login");
    } else {
      addToCartMutation({
        userId: authUser?._id ?? "",
        productId: productId,
      });
    }

    console.log("addToCartMutation");
  };

  return (
    <Tooltip title="Add to Wishlist">
      <>
        {isPending && <LoadSpinner isBackdrop />}
        <Grid
          container
          size={{ xs: 12 }}
          direction="column"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <IconButton onClick={handleClick} size="small">
            {isWishlistItem ? (
              <>
                <FavoriteIcon color="error" />
              </>
            ) : (
              <>
                <FavoriteBorderIcon />
              </>
            )}
          </IconButton>

          <Typography color="textSecondary" variant="caption">
            {wishlistCount}
          </Typography>
        </Grid>
      </>
    </Tooltip>
  );
};

export default Wishlist;
