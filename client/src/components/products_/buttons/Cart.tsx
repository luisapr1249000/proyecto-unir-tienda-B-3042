import { IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../../hooks/auth";
import { toast } from "react-toastify";

const Cart = () => {
  const { data: authUser } = useAuthUser();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!authUser || !authUser._id) {
      toast.warn("Please login to add to Cart");
      navigate("/auth/login");
    }
  };

  return (
    <Tooltip title="Add to Cart">
      <IconButton onClick={handleClick} size="small">
        <AddShoppingCartIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default Cart;
