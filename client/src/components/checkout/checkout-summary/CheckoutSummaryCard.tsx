import Grid from "@mui/material/Grid2";
import { CartItem } from "../../../types/user";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CheckoutSummaryCard = ({ cartItem }: { cartItem: CartItem }) => {
  return (
    <Card
      component={Grid}
      container
      spacing={3}
      elevation={4}
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <CardContent
        // sx={{ border: 1 }}
        component={Grid}
        container
        spacing={3}
        size={{ xs: 5 }}
      >
        <Grid
          size={{ xs: 4, md: 3 }}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <CardMedia
            component="img"
            height="60"
            image={cartItem.product.images[0].url}
            alt={cartItem.product.name}
            sx={{ borderRadius: 1.5 }}
          />
        </Grid>
        <Grid size={{ xs: "auto" }}>
          <Typography gutterBottom variant="body2" color="textSecondary">
            {cartItem.product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Quantity: {cartItem.quantity}
          </Typography>
        </Grid>
      </CardContent>
      <CardContent component={Grid} container spacing={3} size={{ xs: 5 }}>
        <Typography variant="body2" color="textSecondary">
          {cartItem.price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {cartItem.subtotal}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CheckoutSummaryCard;
