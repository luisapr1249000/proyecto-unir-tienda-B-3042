import React from "react";
import { CardContent, Chip, Divider, Rating, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCardActions from "../../card/ProductCardActions";
import { ProductProp } from "../../../../types/product";
import ProductDetailsRating from "./ProductDetailsRating";
import { formatDate } from "../../../../utils/util.dates";
import ProductDetailsSeller from "../ProductDetailsSeller";
import ProductDetailsCategories from "./ProductDetailsCategories";

const ProductDetailsBody = ({ product }: ProductProp) => (
  <CardContent
    sx={{ position: "relative", borderRight: 1, borderColor: "divider" }}
    size={{ xs: 12, md: 4 }}
    component={Grid}
    container
    direction="column"
  >
    {/* <ProductCardActions /> */}

    <Typography
      component="div"
      gutterBottom
      variant="h4"
      sx={{ fontWeight: "bold", width: 0.8 }}
    >
      {product.name}
    </Typography>
    <Divider component="div" sx={{ mb: 1 }}>
      <Typography color="textSecondary" variant="caption">
        Product Description
      </Typography>
    </Divider>
    <Typography
      component="div"
      gutterBottom
      color="textSecondary"
      sx={{ width: 0.8, textAlign: "justify" }}
      variant="body2"
    >
      {product.description}
    </Typography>
    <ProductDetailsRating product={product} />
    <Divider sx={{ my: 2 }}>
      <Typography variant="caption" color="textSecondary">
        Categories
      </Typography>
    </Divider>
    <ProductDetailsCategories product={product} />
    <Divider sx={{ my: 2 }}>
      <Typography variant="caption" color="textSecondary">
        Other Info
      </Typography>
    </Divider>
    <Grid size={{ xs: 12 }}>
      <Typography
        gutterBottom
        component="div"
        color="textSecondary"
        variant="caption"
      >
        Published At {formatDate(product.createdAt)}
      </Typography>
      {product.is_modified && (
        <>
          <Divider />
          <Typography
            gutterBottom
            component="div"
            color="textSecondary"
            variant="caption"
          >
            Updated At {formatDate(product.updatedAt)}
          </Typography>
        </>
      )}
    </Grid>

    <ProductDetailsSeller product={product} />
  </CardContent>
);

export default ProductDetailsBody;
