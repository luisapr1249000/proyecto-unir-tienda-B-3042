import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
const DiscountedPrice = ({
  price,
  finalPrice,
  discount,
}: {
  price: number;
  finalPrice: number;
  discount: number;
}) => (
  <>
    <Typography
      color="textSecondary"
      sx={{ textDecoration: "line-through" }}
      variant="caption"
    >
      $ {price}
    </Typography>
    <Grid container>
      <Typography
        component="div"
        sx={{ fontWeight: "bold", mr: 2 }}
        gutterBottom
        variant="h6"
      >
        $ {finalPrice}
      </Typography>
      <Typography sx={{ fontWeight: "bold" }} color="success" variant="body2">
        {discount}% OFF
      </Typography>
    </Grid>
  </>
);

export default DiscountedPrice;
