import React from "react";
import { useGetUserCart, useGetUserWishlist } from "../../../hooks/user";
import { useOutletContext } from "react-router-dom";
import { User } from "../../../types/user";
import LoadSpinner from "../../../components/common/load-spinner/LoadSpinner";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import { Card, Divider, Typography } from "@mui/material";
import ProductCard from "../../../components/products/product-card/product-card/ProductCard";
import GridLoadingSkeleton from "../../../components/common/load-spinner/GridLoadingSkeleton";
import GridObjectNotFound from "../../../components/common/object-not-found/GridObjectNotFound";
const UserAccountWishlist = () => {
  const context = useOutletContext<User>();
  const { data, isLoading, error, refetch } = useGetUserWishlist({
    userId: context._id,
  });
  console.log(data);

  if (isLoading) return <GridLoadingSkeleton />;
  if (error)
    return <GridObjectNotFound object="Product" onReload={refetch} multiple />;

  return (
    <Grid
      container
      sx={{ ...gridContainerCenter, justifyContent: "space-evenly", p: 3 }}
    >
      <Grid
        sx={{ p: 3 }}
        container
        spacing={2}
        component={Card}
        variant="outlined"
      >
        <Grid direction="column" container size={{ xs: 12 }}>
          <Typography variant="h4">User's Wishlist</Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Grid>
        {data?.wishlist.map((product) => (
          <ProductCard product={product} />
        ))}
      </Grid>
    </Grid>
  );
};

export default UserAccountWishlist;
