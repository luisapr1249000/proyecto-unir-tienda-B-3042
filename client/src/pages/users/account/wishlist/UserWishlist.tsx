import React from "react";
import { useAuthUser } from "../../../../hooks/auth";
import { useGetUserWishlist } from "../../../../hooks/user";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Divider, Typography } from "@mui/material";
import ProductCard from "../../../../components/products_/card/ProductCard";

const UserWishlist = () => {
  const { data: authUser } = useAuthUser();
  const { data: wishlistList } = useGetUserWishlist({
    userId: authUser?._id ?? "",
    enabled: !!authUser,
  });

  return (
    <Grid
      container
      spacing={5}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5">Your Wishlist</Typography>
        </CardContent>
        <Divider />
        <CardContent component={Grid} container spacing={2}>
          {wishlistList && wishlistList.wishlist.length > 0 ? (
            wishlistList.wishlist.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  isWishlistItem={true}
                />
              );
            })
          ) : (
            <Typography variant="h5">No products in wishlist</Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserWishlist;
