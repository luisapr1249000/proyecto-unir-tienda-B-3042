import React from "react";
import Grid from "@mui/material/Grid2";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CSSObject } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../../../api/userProductActions.api";
import { useMutation } from "@tanstack/react-query";
import LoadSpinner from "../../common/load-spinner/LoadSpinner";
import { toast } from "react-toastify";

const AddProductToCart = ({
  productId,
  userId,
  isAuth,
  isIconButton = false,
}: {
  productId: string;
  userId: string;
  isAuth: boolean;
  isIconButton: boolean;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: addProductToCart,
    onSuccess: () => {
      toast("Product Added to your Cart");
    },
    onError: () => {
      toast("The Product Could not be added to your cart");
    },
  });
  const navigate = useNavigate();
  const iconButtonStyle: CSSObject = { position: "absolute", top: 0, right: 0 };
  const handleClick = () => {
    if (!isAuth) navigate("/auth/login", { state: { loginRequired: true } });
    mutate({ productId, userId });
  };

  return (
    <Grid sx={[isIconButton && iconButtonStyle]}>
      {isPending && <LoadSpinner />}
      {isIconButton ? (
        <IconButton onClick={handleClick}>
          <AddShoppingCartIcon />
        </IconButton>
      ) : (
        <Button onClick={handleClick} variant="outlined" fullWidth>
          Add To Cart
        </Button>
      )}
    </Grid>
  );
};

export default AddProductToCart;
