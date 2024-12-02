import React from "react";
import Grid from "@mui/material/Grid2";
import { Rating, Typography } from "@mui/material";
import { Product } from "../../../../types/product";
const ProductItemRating = ({ product }: { product: Product }) => (
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

export default ProductItemRating;
