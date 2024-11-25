import React from "react";
import ProductItemTextField from "./ProductItemTextField";
import Grid from "@mui/material/Grid2";
import { Product } from "../../../types/product";
import { Button, CardContent, TextField, Typography } from "@mui/material";
const ProductItemPrice = ({ product }: { product: Product }) => {
  return (
    <CardContent component={Grid} sx={{ border: 1 }} size={{ xs: 2 }} container>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4">$ {product.price}</Typography>
      </Grid>
      <ProductItemTextField productQuantity={product.price} />
      <Grid size={{ xs: 12 }}>
        <Button fullWidth variant="outlined">
          Add To Cart
        </Button>
      </Grid>
    </CardContent>
  );
};

export default ProductItemPrice;
