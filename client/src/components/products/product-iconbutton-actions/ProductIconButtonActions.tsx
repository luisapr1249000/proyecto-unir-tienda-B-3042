import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import WishlistButton from "./WishlistButton";
import SavedProductButton from "./SavedProductButton";
import { Product } from "../../../types/product";
import { useAuthUser } from "../../../hooks/auth";
import { useGetUserWishlist } from "../../../hooks/user";
import { useQuery } from "@tanstack/react-query";
import { getUserWishlist } from "../../../api/userProductActions.api";
import MoreOptionsButton from "./MoreOptionsButton";

const ProductIconButtonActions = ({ product }: { product: Product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { data: authUser, isSuccess } = useAuthUser();
  const createUserKey = (id: string) => ["user-wishlist", id];
  const queryKeyValue = createUserKey(authUser?._id ?? "");
  const { data: userWishlist } = useQuery({
    queryKey: queryKeyValue,
    queryFn: () => getUserWishlist({ userId: authUser?._id ?? "" }),
  });

  const { _id } = product;
  const isAuthor = product.author._id === authUser?._id;
  useEffect(() => {
    if (authUser && userWishlist) {
      const productInUserWishlist = userWishlist.wishlist.find(
        (product) => product._id === _id
      );
      setIsInWishlist(Boolean(productInUserWishlist));
    }
  }, [authUser, userWishlist, isInWishlist]);
  console.log("isInWishlist: ", isInWishlist);

  return (
    <Grid
      container
      sx={{
        position: "absolute",
        boxShadow: 1,
        p: 1,
        bgcolor: "#eeea",
        top: 0,
        right: 0,
      }}
    >
      <WishlistButton
        queryKey={queryKeyValue}
        productId={product._id}
        userId={authUser?._id}
        isFavorite={isInWishlist}
        isAuth={isSuccess}
      />
      <MoreOptionsButton isAuthor={isAuthor} productId={product._id} />
      {/* <SavedProductButton
        productId={product._id}
        userId={authUser?._id}
        isAuth={isSuccess}
      /> */}
    </Grid>
  );
};

export default ProductIconButtonActions;
