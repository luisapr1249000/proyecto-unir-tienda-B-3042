import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
const UserAccountCartNoItems = () => {
  return (
    <Card
      component={Grid}
      sx={{ justifyContent: "center", alignItems: "center" }}
      //   variant="outlined"
      elevation={4}
      size={{ xs: 12 }}
    >
      <CardContent
        spacing={2}
        component={Grid}
        container
        direction="column"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <AddShoppingCartIcon sx={{ fontSize: 100, color: "primary.main" }} />
        <Typography variant="h5" color="">
          Your cart looks empty!
        </Typography>
        <Button variant="contained">Shop now!</Button>
      </CardContent>
    </Card>
  );
};

export default UserAccountCartNoItems;
