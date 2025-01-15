import { Badge, IconButton, Tooltip } from "@mui/material";
import React from "react";
import CartIcon from "@mui/icons-material/ShoppingCart";

const UserCart = () => {
  return (
    <Tooltip title="Cart">
      <IconButton>
        <Badge badgeContent={3} color="primary">
          <CartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default UserCart;
