import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { useAuthUser } from "../../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { data: authUser } = useAuthUser();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!authUser || !authUser._id) {
      toast.warn("Please login to add to Wishlist");
      navigate("/auth/login");
    }
  };

  return (
    <Tooltip title="Add to Wishlist">
      <IconButton onClick={handleClick} size="small">
        <FavoriteBorderIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default Wishlist;
