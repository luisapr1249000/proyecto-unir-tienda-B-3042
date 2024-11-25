import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  addProductToWishlist,
  RemoveProductToWishlist,
} from "../../../api/userProductActions.api";
import { toast } from "react-toastify";

const WishlistButton = ({
  productId,
  userId,
  isAuth,
  isFavorite = false,
}: {
  isFavorite?: boolean;
  productId: string;
  userId?: string;
  isAuth: boolean;
}) => {
  console.log(productId);
  const toggleFunction = () =>
    isFavorite ? RemoveProductToWishlist : addProductToWishlist;
  const { mutate, isPending } = useMutation({
    mutationFn: isFavorite ? RemoveProductToWishlist : addProductToWishlist,
    onSuccess: () => {
      toast.success("Product Added to your Wishlist");
    },
    onError: () => {
      toast.warning("The Product Could not be added to your wishlist");
    },
  });

  const navigate = useNavigate();
  const handleClick = () => {
    if (!isAuth) navigate("/auth/login", { state: { loginRequired: true } });
    mutate();
  };
  return (
    <IconButton onClick={handleClick}>
      {isFavorite ? (
        <FavoriteIcon sx={{ color: "#f00" }} />
      ) : (
        <FavoriteBorderIcon fontSize="small" />
      )}
    </IconButton>
  );
};

export default WishlistButton;
