import Grid from "@mui/material/Grid2";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductId } from "../../../../../types/product";
import { useAuthUser } from "../../../../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toggleProductInWishlist } from "../../../../../api/users/userProductActions.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackdropLoading from "../../../../common/loaders/BackdropLoading";

const WishlistButton = ({
  isWishlistItem = false,
  productId,
}: {
  isWishlistItem: boolean;
} & ProductId) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: authUser } = useAuthUser();
  const { mutate: addToWishlistMutation, isPending } = useMutation({
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
    if (!authUser) {
      toast.warn("Please login to add to Wishlist");
      navigate("/auth/login");
    }
    if (authUser)
      addToWishlistMutation({
        userId: authUser._id,
        productId,
      });
  };

  if (isPending) return <BackdropLoading />;

  return (
    <Grid
      container
      sx={{ justifyContent: "center", alignItems: "center" }}
      size={{ xs: 12, md: "grow" }}
    >
      <Tooltip title="Add to Wishlist">
        <IconButton onClick={handleClick}>
          {isWishlistItem ? (
            <FavoriteIcon color="error" fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default WishlistButton;
