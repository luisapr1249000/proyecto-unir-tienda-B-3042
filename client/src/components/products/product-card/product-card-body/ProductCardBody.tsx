import { Box, CardContent, Rating, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { Product } from "../../../../types/product";
import { Link } from "react-router-dom";
import ReactLink from "../../../common/react-link/ReactLink";

const ProductCardBody = ({ product }: { product: Product }) => {
  return (
    <CardContent sx={{}}>
      <Grid
        container
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "flex-start" }}
      >
        <Typography color="textSecondary" variant="caption">
          {product.averageReview}
        </Typography>
        <Rating value={product.averageReview} size="small" readOnly />
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
      {product.discount ? (
        <>
          <Typography
            color="textSecondary"
            sx={{ textDecoration: "line-through" }}
            variant="caption"
          >
            $ {product.price}
          </Typography>
          <Grid container>
            <Typography
              component="div"
              sx={{ fontWeight: "bold", mr: 2 }}
              gutterBottom
              variant="h6"
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
          <ReactLink to={`/products/item/${product._id}`}>
            $ {product.price}
          </ReactLink>
        </Typography>
      )}
    </CardContent>
  );
};

export default ProductCardBody;
