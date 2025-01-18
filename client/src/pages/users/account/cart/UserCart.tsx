import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography, Paper, Card, CardContent } from "@mui/material";
import UserCartView from "../../../../components/users_/account/cart/UserCartView";
import { useParams } from "react-router-dom";
import { useGetUserCart } from "../../../../hooks/user";
import CircleLoadingGrid from "../../../../components/common/loading/CircleLoadingGrid";
import ObjectNotFound from "../../../../components/common/errors/object-not-found/ObjectNotFound";

const UserCart = () => {
  const { username } = useParams();
  const {
    data: userCartItems,
    isLoading: isLoadingUserCart,
    error: userCartError,
    refetch,
  } = useGetUserCart({ userId: username ?? "" });

  if (isLoadingUserCart) return <CircleLoadingGrid />;
  if (userCartError) return <ObjectNotFound object="Cart" onReload={refetch} />;
  if (!userCartItems)
    return <ObjectNotFound object="Cart" onReload={refetch} />;

  return (
    <Grid container spacing={3} size={{ xs: 10 }} sx={{ p: 3 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">User Overview</Typography>
        </CardContent>
        <Divider />

        <UserCartView userCartItems={userCartItems.items} />
      </Card>
    </Grid>
  );
};

export default UserCart;
