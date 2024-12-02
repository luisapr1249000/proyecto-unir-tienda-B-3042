import React from "react";
import Grid from "@mui/material/Grid2";
import { Chip, Divider, Typography } from "@mui/material";
import { Product } from "../../../../types/product";
import { Link } from "react-router-dom";

const ProductItemCategories = ({ product }: { product: Product }) => (
  <>
    <Grid sx={{ p: 2 }} size={{ xs: 12 }}>
      <Divider>
        <Typography variant="caption" color="textSecondary">
          Categories
        </Typography>{" "}
      </Divider>
    </Grid>
    <Grid container spacing={2} size={{ xs: 12 }}>
      {product.categories.map((category) => (
        <Chip
          clickable
          component={Link}
          to={`/products/category/${category.name}`}
          label={category.name}
        />
      ))}
    </Grid>
    <Grid sx={{ p: 2 }} size={{ xs: 12 }}>
      <Divider />
    </Grid>
  </>
);

export default ProductItemCategories;
