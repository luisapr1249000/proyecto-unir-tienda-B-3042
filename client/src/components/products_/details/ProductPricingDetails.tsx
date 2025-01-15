import React from "react";
import { ProductProp } from "../../../types/product";
import { Button, CardContent, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductQuantitySelectorForm from "./quantity-selector/ProductQuantitySelectorForm";

const ProductPricingDetails = ({ product }: ProductProp) => (
  <CardContent component={Grid} size={{ xs: 12, md: 3 }}>
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
    <Divider sx={{ flexGrow: 1, my: 3 }} />
    <ProductQuantitySelectorForm productQuantity={product.quantity} />
  </CardContent>
);

export default ProductPricingDetails;
