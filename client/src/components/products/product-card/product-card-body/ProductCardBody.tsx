import { Box, CardContent, Rating, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { Product } from "../../../../types/product";
import { Link } from "react-router-dom";
import ReactLink from "../../../common/react-link/ReactLink";

const ProductCardBody = ({ product }: { product: Product }) => {
  return (
    <CardContent sx={{}}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Rating size="small" readOnly />
        <Typography color="textSecondary" variant="caption">
          40 Sold
        </Typography>
      </Grid>
      <Typography
        component="div"
        sx={{ textTransform: "capitalize", mt: 0.5 }}
        gutterBottom
        variant="body2"
      >
        {product.name}
      </Typography>
      <Typography
        component="div"
        sx={{ fontWeight: "bold" }}
        gutterBottom
        variant="h6"
      >
        <ReactLink to={`/products/item/${product._id}`}>
          $ {product.price}
        </ReactLink>
      </Typography>
    </CardContent>
  );
};

export default ProductCardBody;
