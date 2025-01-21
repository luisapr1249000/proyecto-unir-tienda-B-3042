import React from "react";
import Grid from "@mui/material/Grid2";
import { Chip } from "@mui/material";
import { ProductProp } from "../../../../types/product";
import { Link } from "react-router-dom";

const ProductDetailsCategories = ({ product }: ProductProp) => (
  <Grid container spacing={2} size={{ xs: 12 }}>
    {product.categories.map((category) => (
      <Chip
        clickable
        component={Link}
        to={`/products/categories/${category.name}`}
        label={category.name}
      />
    ))}
  </Grid>
);

export default ProductDetailsCategories;
