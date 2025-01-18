import React from "react";
import Grid from "@mui/material/Grid2";
import { useGetUserCart } from "../../../hooks/user.hooks";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import UserCartSummaryCard from "./UserCartSummaryCard";

const UserCartView = ({ userCartItems }: { userCartItems: UserCartItem[] }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">User Cart</Typography>
      </CardContent>
      <Divider />
      <CardContent>
        {userCartItems.map((userCartItem) => (
          <UserCartSummaryCard userCartItem={userCartItem} />
        ))}
      </CardContent>
    </Card>
  );
};

export default UserCartView;
