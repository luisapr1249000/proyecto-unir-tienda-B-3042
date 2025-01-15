import React from "react";
import Grid from "@mui/material/Grid2";
import { Rating, Typography } from "@mui/material";
import { ProductProp } from "../../../../types/product";

const ProductDetailsRating = ({ product }: ProductProp) => (
  <Grid container sx={{ mt: 3 }}>
    <Grid size={{ xs: 12 }}>
      <Rating readOnly />
      <Typography gutterBottom>({product.price})</Typography>
    </Grid>
    <Grid size={{ xs: 12 }}>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Reviews
      </Typography>
    </Grid>
  </Grid>
);
export default ProductDetailsRating;
