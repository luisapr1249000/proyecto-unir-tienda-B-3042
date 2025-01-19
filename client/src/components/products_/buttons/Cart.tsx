import { IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../../hooks/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { toggleProductInCart } from "../../../api/users/userProductActions.api";
import { Product, ProductId } from "../../../types/product";
import LoadSpinner from "../../common/load-spinner/LoadSpinner";

const Cart = ({ productId }: ProductId) => {
  const [isCartItem, setIsCartItem] = useState(false);

  const { data: authUser, isSuccess: isAuthSuccess } = useAuthUser();
  const navigate = useNavigate();
  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: toggleProductInCart,
    onSuccess: () => {
      console.log("success");
      toast.success("Product added to Cart successfully");
    },
    onError: () => {
      console.log("error");
      toast.error("Something went wrong");
    },
  });

  const handleClick = () => {
    console.log("authUser", authUser);
    if (!authUser || !isAuthSuccess) {
      toast.warn("Please login to add to Cart");
      navigate("/auth/login");
    } else {
      addToCartMutation({
        userId: authUser?._id ?? "",
        productId: productId,
        quantity: 1,
      });
    }

    console.log("addToCartMutation");
  };

  return (
    <Tooltip title="Add to Cart">
      <>
        {isPending && <LoadSpinner isBackdrop />}
        <IconButton onClick={handleClick} size="small">
          <AddShoppingCartIcon fontSize="inherit" />
        </IconButton>
      </>
    </Tooltip>
  );
};

export default Cart;
