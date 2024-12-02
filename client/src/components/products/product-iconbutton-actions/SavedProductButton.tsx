import { IconButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SavedProductButton = ({
  productId,
  userId,
  isAuth,
}: {
  productId: string;
  userId?: string;
  isAuth: boolean;
}) => {
  // const { mutate, isPending } = useMutation({
  //   mutationFn: addProductToSavedProducts,
  //   onSuccess: () => {
  //     toast("Product Added to your Cart");
  //   },
  //   onError: () => {
  //     toast("The Product Could not be added to your cart");
  //   },
  // });

  const navigate = useNavigate();
  const handleClick = () => {
    if (!isAuth) navigate("/auth/login", { state: { loginRequired: true } });
    // mutate({ productId, userId });
  };
  return (
    <IconButton onClick={handleClick}>
      <PlaylistAddIcon fontSize="small" />
    </IconButton>
  );
};

export default SavedProductButton;
