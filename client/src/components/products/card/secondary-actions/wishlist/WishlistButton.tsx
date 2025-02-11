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
import IconLoader from "../../../../common/loaders/IconLoader";
import useProductStore from "../../../../../zustand/productSlice";
import { ProductPaginationResults } from "../../../../../types/query";

const WishlistButton = ({
  isWishlistItem = false,
  productId,
}: {
  isWishlistItem: boolean;
} & ProductId) => {
  const { sortBy, page, limit } = useProductStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: authUser } = useAuthUser();
  const { mutate: addToWishlistMutation, isPending } = useMutation({
    mutationFn: toggleProductInWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`user-${authUser?._id}-wishlist`],
      });
      queryClient.setQueryData(
        ["products", { sortBy, page, limit }],
        (
          oldData?: ProductPaginationResults
        ): ProductPaginationResults | undefined => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            docs: oldData.docs.map((product) => {
              if (product._id === productId) {
                return isWishlistItem
                  ? { ...product, wishlistCount: product.wishlistCount - 1 }
                  : { ...product, wishlistCount: product.wishlistCount + 1 };
              }
              return product;
            }),
          };
        }
      );
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

  if (isPending) return <IconLoader />;

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
