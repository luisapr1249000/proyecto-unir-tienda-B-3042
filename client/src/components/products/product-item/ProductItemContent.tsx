import { CardContent, Divider, Rating, Typography } from "@mui/material";
import React from "react";
import { Product } from "../../../types/product";
import Grid from "@mui/material/Grid2";
import { formatDate } from "../../../utils/util.dates";
import ProductItemRating from "./ProductItemRating";
import ProductItemCategories from "./ProductItemCategories";
import ProductIconButtonActions from "../product-iconbutton-actions/ProductIconButtonActions";

const ProductItemContent = ({ product }: { product: Product }) => {
  return (
    <CardContent
      sx={{ position: "relative" }}
      size={{ xs: 5 }}
      component={Grid}
      container
      direction="column"
    >
      <ProductIconButtonActions product={product} />

      <Typography
        component="div"
        gutterBottom
        variant="h4"
        sx={{ fontWeight: "bold", width: 0.9 }}
      >
        {product.name}
      </Typography>
      <Divider sx={{ mb: 1, width: 0.9 }}>
        <Typography color="textSecondary" variant="caption">
          Product Description
        </Typography>
      </Divider>
      <Typography
        component="div"
        gutterBottom
        sx={{ width: 0.8, textAlign: "justify" }}
        variant="body2"
      >
        {product.description}
      </Typography>
      <ProductItemRating product={product} />

      <ProductItemCategories product={product} />
      <Grid size={{ xs: 12 }}>
        <Typography
          gutterBottom
          component="div"
          color="textSecondary"
          variant="caption"
        >
          Published At {formatDate(product.createdAt)}
        </Typography>
      </Grid>
    </CardContent>
  );
};

export default ProductItemContent;
