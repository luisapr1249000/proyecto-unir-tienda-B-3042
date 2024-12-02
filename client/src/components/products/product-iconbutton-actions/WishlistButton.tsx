import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toggleProductInWishlist } from "../../../api/userProductActions.api";
import LoadSpinner from "../../common/load-spinner/LoadSpinner";

const WishlistButton = ({
  productId,
  userId,
  isAuth,
  isFavorite = false,
  queryKey,
}: {
  isFavorite?: boolean;
  productId: string;
  userId?: string;
  isAuth: boolean;
  queryKey: string[];
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: toggleProductInWishlist,
    onSuccess: () => {
      toast.success("Product Added to your Wishlist");
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onError: () => {
      toast.warning("The Product Could not be added to your wishlist");
    },
  });

  const navigate = useNavigate();
  const handleClick = () => {
    if (!isAuth) navigate("/auth/login", { state: { loginRequired: true } });
    mutate({ productId: productId, userId: userId ?? "" });
  };

  useEffect(() => {});
  if (isPending) return <LoadSpinner />;
  return (
    <Tooltip title={isFavorite ? "Remove From Wishlist" : "Add To Wishlist"}>
      <IconButton size="small" onClick={handleClick}>
        {isFavorite ? (
          <FavoriteIcon fontSize="inherit" sx={{ color: "#f00" }} />
        ) : (
          <FavoriteBorderIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default WishlistButton;
