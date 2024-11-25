import React from "react";
import { useOutletContext } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import { Card, Divider, Typography } from "@mui/material";
import ProductCard from "../../../components/products/product-card/product-card/ProductCard";
import GridLoadingSkeleton from "../../../components/common/load-spinner/GridLoadingSkeleton";
import { useGetUserCart } from "../../../hooks/user";
import { User } from "../../../types/user";
import GridObjectNotFound from "../../../components/common/object-not-found/GridObjectNotFound";

const UserAccountCart = () => {
  const context = useOutletContext<User>();
  const { data, isLoading, error, refetch } = useGetUserCart({
    userId: context._id,
  });

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
        {data?.cart.map((product) => (
          <ProductCard product={product} />
        ))}
      </Grid>
    </Grid>
  );
};

export default UserAccountCart;
