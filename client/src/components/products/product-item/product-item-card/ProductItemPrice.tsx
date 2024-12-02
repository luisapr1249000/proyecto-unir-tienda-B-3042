import React from "react";
import Grid from "@mui/material/Grid2";
import { Product } from "../../../../types/product";
import { Button, CardContent, Divider, Typography } from "@mui/material";
import ProductItemTextField from "./ProductItemTextField";
const ProductItemPrice = ({ product }: { product: Product }) => (
  <CardContent
    component={Grid}
    size={{ xs: 12, md: 3 }}
    container
    sx={{ border: 1 }}
  >
    <Grid size={{ xs: 12 }}>
      <Typography gutterBottom color="textSecondary" variant="subtitle2">
        Price:
      </Typography>
      {product.discount ? (
        <>
          <Typography
            color="textSecondary"
            sx={{ textDecoration: "line-through" }}
            variant="body2"
          >
            $ {product.price}
          </Typography>
          <Grid container>
            <Typography
              component="div"
              sx={{ fontWeight: "bold", mr: 2 }}
              gutterBottom
              variant="h5"
            >
              $ {product.finalPrice}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              color="success"
              variant="body2"
            >
              {product.discount}% OFF
            </Typography>
          </Grid>
        </>
      ) : (
        <Typography
          component="div"
          sx={{ fontWeight: "bold" }}
          gutterBottom
          variant="h6"
        >
          $ {product.price}
        </Typography>
      )}
      <Divider sx={{ flexGrow: 1 }} />
    </Grid>
    <ProductItemTextField productQuantity={product.quantity} />

    <Grid size={{ xs: 12 }}>
      <Divider sx={{ mb: 3 }} />
      <Button fullWidth variant="outlined">
        Add To Cart
      </Button>
    </Grid>
  </CardContent>
);

export default ProductItemPrice;
