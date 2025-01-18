import React from "react";
import Card from "@mui/material/Card";
import { UserCartItem } from "../../../../types/user";
import { CardContent, CardMedia, Typography } from "@mui/material";

const UserCartSummaryCard = ({
  userCartItem,
}: {
  userCartItem: UserCartItem;
}) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        height="200"
        image={userCartItem.product.images[0].url}
      />

      <CardContent>
        <Typography variant="h5">{userCartItem.product.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserCartSummaryCard;
